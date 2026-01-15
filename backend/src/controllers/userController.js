import Resource from "../models/Resource.js";
import User from "../models/User.js";

// Get user profile by ID
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("submittedResources", "title url category upvotes");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get user stats
    const stats = {
      submittedResources: user.submittedResources.length,
      bookmarks: user.bookmarks.length,
      contributionScore: user.contributionScore,
    };

    res.json({
      success: true,
      data: {
        user,
        stats,
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get current user profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("bookmarks", "title url category upvotes")
      .populate("submittedResources", "title url category upvotes");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get my profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { username, email, avatar, emailNotifications } = req.body;

    if (email || username) {
      const exists = await User.findOne({
        $or: [{ email }, { username }],
        _id: { $ne: req.user.id },
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Email or username already in use",
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, avatar, emailNotifications },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Toggle bookmark
export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const resourceId = req.params.resourceId;

    // Check if resource exists
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Check if already bookmarked
    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === resourceId
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== resourceId
      );

      await user.save();

      res.json({
        success: true,
        message: "Bookmark removed",
        bookmarked: false,
      });
    } else {
      user.bookmarks.push(resourceId);
      await user.save();

      res.json({
        success: true,
        message: "Bookmark added",
        bookmarked: true,
      });
    }
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get user's bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "bookmarks",
      populate: {
        path: "submittedBy",
        select: "username avatar",
      },
    });

    res.json({
      success: true,
      data: user.bookmarks,
    });
  } catch (error) {
    console.error("Get bookmarks error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
