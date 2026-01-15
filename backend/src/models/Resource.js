import mongoose from "mongoose";
import validator from "validator";
import { RESOURCE_CATEGORIES, RESOURCE_TAGS } from "../config/constants.js";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    url: {
      type: String,
      required: [true, "Please provide a URL"],
      validate: [validator.isURL, "Please provide a valid URL"],
    },

    category: {
      type: String,
      required: true,
      enum: RESOURCE_CATEGORIES,
    },

    tags: [
      {
        type: String,
        enum: RESOURCE_TAGS,
      },
    ],

    image: {
      type: String,
      default: null,
    },

    upvotes: {
      type: Number,
      default: 0,
    },

    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    visits: {
      type: Number,
      default: 0,
    },

    metadata: {
      icon: String,
      screenshot: String,
      domain: String,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// -------------------- INDEXES --------------------

// Text search
resourceSchema.index({ title: "text", description: "text" });

// Filtering / sorting
resourceSchema.index({ category: 1, upvotes: -1 });
resourceSchema.index({ submittedBy: 1 });
resourceSchema.index({ isFeatured: 1, createdAt: -1 });

// GLOBAL DUPLICATE PREVENTION (URL-based)
resourceSchema.index({ url: 1 }, { unique: true });

// -------------------- HOOKS --------------------

// Auto-set domain from URL (on CREATE)
resourceSchema.pre("save", function (next) {
  if (this.url && !this.metadata.domain) {
    try {
      const urlObj = new URL(this.url);
      this.metadata.domain = urlObj.hostname;
    } catch (error) {
      // Invalid URL, skip
    }
  }
  next();
});

// Auto-set domain from URL (on UPDATE)
resourceSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update?.url) {
    try {
      const urlObj = new URL(update.url);
      update.metadata = update.metadata || {};
      update.metadata.domain = urlObj.hostname;
    } catch (error) {
      // Invalid URL, skip
    }
  }

  next();
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
