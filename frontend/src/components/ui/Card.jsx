// src/components/ui/Card.jsx
import { motion } from "framer-motion";
import {
  FiBookmark,
  FiCheckCircle,
  FiExternalLink,
  FiHeart,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Card = ({
  resource,
  onUpvote,
  onBookmark,
  isBookmarked: initialBookmarked,
  upvoted: initialUpvoted,
  showActions = true,
}) => {
  const isBookmarked = initialBookmarked || false;
  const isUpvoted = initialUpvoted || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      {/* Featured badge */}
      {resource.isFeatured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-xs font-medium text-white">
            <FiStar className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* Verified badge */}
      {resource.isVerified && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
            <FiCheckCircle className="w-3 h-3" />
            Verified
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header with domain */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {resource.metadata?.domain && (
              <div className="text-xs text-text-soft bg-bg-soft px-2 py-1 rounded-lg">
                {resource.metadata.domain}
              </div>
            )}
            <span className="text-xs px-2 py-1 rounded-lg bg-brand/10 text-brand">
              {resource.category}
            </span>
          </div>
        </div>

        {/* Title and description */}
        <Link to={`/resources/${resource._id}`}>
          <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-brand transition-colors">
            {resource.title}
          </h3>
        </Link>
        <p className="text-sm text-text-soft mb-4 line-clamp-2">
          {resource.description}
        </p>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-lg bg-bg-soft text-text-soft"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-lg bg-bg-soft text-text-soft">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer with actions and metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            {/* Upvotes */}
            {showActions && onUpvote && (
              <button
                onClick={() => onUpvote(resource._id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  isUpvoted ? "text-brand" : "text-text-soft hover:text-brand"
                }`}
              >
                <FiHeart
                  className={`w-4 h-4 transition-transform ${
                    isUpvoted ? "fill-current" : ""
                  }`}
                />
                <span>{resource.upvotes || 0}</span>
              </button>
            )}

            {/* Bookmark */}
            {showActions && onBookmark && (
              <button
                onClick={() => onBookmark(resource._id)}
                className={`text-sm transition-colors ${
                  isBookmarked
                    ? "text-brand"
                    : "text-text-soft hover:text-brand"
                }`}
              >
                <FiBookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
            )}

            {/* Submitted by */}
            {resource.submittedBy && (
              <div className="text-xs text-text-soft">
                By {resource.submittedBy.username}
              </div>
            )}
          </div>

          {/* External link */}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand hover:text-brand/80 transition-colors"
          >
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
