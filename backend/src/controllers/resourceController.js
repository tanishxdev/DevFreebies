import { RESOURCE_CATEGORIES } from "../config/constants.js";
import Resource from "../models/Resource.js";
import User from "../models/User.js";

// Get all resources with filtering
export const getResources = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const { category, search, sort = "-createdAt", featured } = req.query;

    // Build query
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    // Execute query
    const resources = await Resource.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("submittedBy", "username avatar");
    // .lean();

    const total = await Resource.countDocuments(query);

    res.json({
      success: true,
      count: resources.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: resources,
    });
  } catch (error) {
    console.error("Get resources error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get single resource
export const getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate("submittedBy", "username avatar")
      .populate("upvotedBy", "username");

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Increment visit count
    resource.visits += 1;
    await resource.save();

    res.json({
      success: true,
      data: resource,
    });
  } catch (error) {
    console.error("Get resource error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createResource = async (req, res) => {
  try {
    // 1. Per-user limit check (MAX 3)
    const userResourceCount = await Resource.countDocuments({
      submittedBy: req.user.id,
    });

    if (userResourceCount >= 3) {
      return res.status(400).json({
        success: false,
        message: "You can submit a maximum of 3 resources",
      });
    }

    // 2. Create resource
    req.body.submittedBy = req.user.id;

    const resource = await Resource.create(req.body);

    // 3. Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $push: { submittedResources: resource._id },
      $inc: { contributionScore: 5 },
    });

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    console.error("Create resource error:", error);

    // 4. Duplicate URL error (GLOBAL)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This resource already exists",
      });
    }

    // 5. Validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update resource
export const updateResource = async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Check ownership or admin
    const isOwner = resource.submittedBy.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this resource",
      });
    }

    // Allowed fields for update
    const allowedFields = [
      "title",
      "description",
      "url",
      "image",
      "category",
      "tags",
    ];

    // Admin-only fields
    if (isAdmin) {
      allowedFields.push("isFeatured", "isVerified");
    }

    // Build safe update object
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    resource = await Resource.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: resource,
    });
  } catch (error) {
    console.error("Update resource error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete resource
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Check ownership or admin
    if (
      resource.submittedBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this resource",
      });
    }

    await resource.deleteOne();

    // Remove from user's submitted resources
    await User.findByIdAndUpdate(resource.submittedBy, {
      $pull: { submittedResources: resource._id },
      $inc: { contributionScore: -5 },
    });

    res.json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.error("Delete resource error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Upvote resource
export const upvoteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Check if already upvoted
    const alreadyUpvoted = resource.upvotedBy.some(
      (id) => id.toString() === req.user.id
    );

    if (alreadyUpvoted) {
      // Remove upvote
      resource.upvotes -= 1;
      resource.upvotedBy.pull(req.user.id);
    } else {
      // Add upvote
      resource.upvotes += 1;
      resource.upvotedBy.push(req.user.id);
    }

    await resource.save();

    res.json({
      success: true,
      data: {
        upvotes: resource.upvotes,
        upvoted: !alreadyUpvoted,
      },
    });
  } catch (error) {
    console.error("Upvote error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get categories with counts
export const getCategories = async (req, res) => {
  try {
    const categories = RESOURCE_CATEGORIES.map((category) => ({
      name: category,
      count: 0,
    }));

    // Get counts for each category
    for (let category of categories) {
      category.count = await Resource.countDocuments({
        category: category.name,
      });
    }

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
