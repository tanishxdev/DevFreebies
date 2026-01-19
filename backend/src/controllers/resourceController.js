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
    let query = {
      isVerified: true, // 🔒 public only sees approved
    };

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
    const resource = await Resource.findOne({
      _id: req.params.id,
      isVerified: true,
    })
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
  /*************  ✨ Windsurf Command 🌟  *************/
};
// Create a new resource
// Only available to users with less than 3 submitted resources
// Admins are auto-approved
export const createResource = async (req, res) => {
  try {
    // Check if user has submitted less than 3 resources
    if (req.user.role !== "admin") {
      const userResourceCount = await Resource.countDocuments({
        submittedBy: req.user.id,
      });

      if (userResourceCount >= 3) {
        return res.status(400).json({
          success: false,
          message: "You can submit a maximum of 3 resources",
        });
      }
    }

    // Remove isVerified and isFeatured from request body
    // as they should never be provided by the client
    // 🔒 NEVER trust client
    delete req.body.isVerified;
    delete req.body.isFeatured;

    // Set submittedBy to the current user ID
    req.body.submittedBy = req.user.id;

    // Admin auto-approval
    if (req.user.role === "admin") {
      req.body.isVerified = true;
    }

    // Create the resource
    const resource = await Resource.create(req.body);

    // Update the user's submitted resources and contribution score
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
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/*******  7cd8f766-2d65-4d4d-9fea-575412a16da0  *******/
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

    const isOwner = resource.submittedBy.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this resource",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "url",
      "image",
      "category",
      "tags",
    ];

    if (isAdmin) {
      allowedFields.push("isFeatured", "isVerified");
    }

    // ✅ DECLARE FIRST
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // ✅ Feature always implies approval
    if (isAdmin && updates.isFeatured === true) {
      updates.isVerified = true;
    }

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
      (id) => id.toString() === req.user.id,
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
