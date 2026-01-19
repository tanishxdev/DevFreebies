import Resource from "../models/Resource.js";

// Get all pending (unverified) resources
export const getPendingResources = async (req, res) => {
  try {
    const resources = await Resource.find({ isVerified: false })
      .sort("-createdAt")
      .populate("submittedBy", "username email");

    res.json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    console.error("Get pending resources error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Approve resource
export const approveResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // ✅ Approve only (do not feature)
    resource.isVerified = true;

    await resource.save();

    res.json({
      success: true,
      message: "Resource approved",
      data: resource,
    });
  } catch (error) {
    console.error("Approve resource error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Reject resource (delete)
export const rejectResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    await resource.deleteOne();

    res.json({
      success: true,
      message: "Resource rejected and deleted",
    });
  } catch (error) {
    console.error("Reject resource error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// Feature resource
export const featureResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (resource.isFeatured && resource.isVerified) {
      return res.json({
        success: true,
        message: "Resource already featured",
        data: resource,
      });
    }

    resource.isVerified = true;
    resource.isFeatured = true;

    await resource.save();

    res.json({
      success: true,
      message: "Resource approved and featured",
      data: resource,
    });
  } catch (error) {
    console.error("Feature resource error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Unfeature resource (KEEP APPROVED)
export const unfeatureResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // ✅ Only remove feature, keep verified
    resource.isFeatured = false;

    await resource.save();

    res.json({
      success: true,
      message: "Resource unfeatured",
      data: resource,
    });
  } catch (error) {
    console.error("Unfeature resource error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
