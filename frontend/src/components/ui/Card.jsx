import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiUpvote } from "react-icons/bi";
import { FiArrowUpRight, FiBookmark, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as resourcesService from "../../services/resources";
import * as usersService from "../../services/users";

/* ---------- Gradient System ---------- */
const getGradient = (text) => {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = (Math.abs(hash) % 40) + 140;

  return {
    from: `hsl(${hue}, 70%, 35%)`,
    to: `hsl(${hue + 12}, 80%, 20%)`,
  };
};

/* ---------- Image Resolver ---------- */
const getImage = (resource) => {
  if (resource.image && resource.image.trim() !== "") {
    return resource.image;
  }
  return null;
};

/* ---------- Card Component ---------- */
const Card = ({ resource, onUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(resource.upvotes || 0);
  const [bookmarked, setBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleUpvote = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error("Login required");

    try {
      const res = await resourcesService.upvoteResource(resource._id);
      setUpvoted(res.data.upvoted);
      setUpvotes(res.data.upvotes);
      if (onUpdate) onUpdate();
    } catch {
      toast.error("Failed to upvote");
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error("Login required");

    try {
      const res = await usersService.toggleBookmark(resource._id);
      setBookmarked(res.bookmarked);
      toast.success(res.message);
    } catch {
      toast.error("Failed to bookmark");
    }
  };

  const imageUrl = getImage(resource);
  const showGradient = !imageUrl || imageError;
  const gradient = getGradient(resource.title);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl bg-surface border border-border hover:border-brand/40 transition overflow-hidden"
    >
      {resource.isFeatured && (
        <div className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-brand-soft text-brand z-10">
          Featured
        </div>
      )}

      <Link to={`/resources/${resource._id}`}>
        {/* Image / Gradient */}
        <div className="h-32 overflow-hidden relative">
          {showGradient ? (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              }}
            />
          ) : (
            <img
              src={imageUrl}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-soft text-brand">
              {resource.category}
            </span>
            {resource.isVerified && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-bg-soft text-text-soft">
                Verified
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-medium text-text mb-1 line-clamp-1">
            {resource.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-soft line-clamp-2 mb-3">
            {resource.description}
          </p>

          {/* Tags */}
          {resource.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {resource.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 bg-bg-soft text-text-soft rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-4 text-text-soft text-sm">
              <div className="flex items-center gap-1">
                <BiUpvote /> {upvotes}
              </div>
              <div className="flex items-center gap-1">
                <FiEye /> {resource.visits || 0}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleUpvote}
                className={`p-1.5 rounded-md transition ${
                  upvoted
                    ? "bg-brand-soft text-brand"
                    : "hover:bg-bg-soft text-text-soft"
                }`}
              >
                <BiUpvote />
              </button>

              <button
                onClick={handleBookmark}
                className={`p-1.5 rounded-md transition ${
                  bookmarked
                    ? "bg-warning/20 text-warning"
                    : "hover:bg-bg-soft text-text-soft"
                }`}
              >
                <FiBookmark />
              </button>

              <div className="p-1.5 rounded-md hover:bg-bg-soft text-text-soft">
                <FiArrowUpRight />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
