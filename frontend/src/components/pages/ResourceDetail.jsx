// src/components/pages/ResourceDetail.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiBookmark,
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiEye,
  FiHeart,
  FiShare2,
  FiStar,
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as resourcesService from "../../services/resources";
import * as userService from "../../services/users";
import Button from "../ui/Button";

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [relatedResources, setRelatedResources] = useState([]);

  useEffect(() => {
    if (id) {
      fetchResource();
    }
  }, [id]);

  const fetchResource = async () => {
    try {
      setLoading(true);
      const res = await resourcesService.getResource(id);
      setResource(res.data);

      // Check if user has bookmarked or upvoted this resource
      if (isAuthenticated && user) {
        // This would require additional API endpoints
        // For now, we'll simulate with local storage
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        setBookmarked(bookmarks.includes(id));

        const upvotes = JSON.parse(localStorage.getItem("upvotes") || "[]");
        setUpvoted(upvotes.includes(id));
      }

      // Fetch related resources
      fetchRelatedResources(res.data?.category);
    } catch (error) {
      console.error("Error fetching resource:", error);
      toast.error("Failed to load resource");
      navigate("/resources");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedResources = async (category) => {
    try {
      const res = await resourcesService.getResources({
        category,
        limit: 4,
        sort: "-upvotes",
      });
      setRelatedResources(res.data?.filter((r) => r._id !== id) || []);
    } catch (error) {
      console.error("Error fetching related resources:", error);
    }
  };

  const handleUpvote = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await resourcesService.upvoteResource(id);

      // Update local state
      setUpvoted(!upvoted);
      setResource((prev) => ({
        ...prev,
        upvotes: upvoted ? prev.upvotes - 1 : prev.upvotes + 1,
      }));

      toast.success(upvoted ? "Upvote removed" : "Resource upvoted!");
    } catch (error) {
      toast.error("Failed to upvote resource");
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await userService.toggleBookmark(id);

      // Update local state
      setBookmarked(!bookmarked);
      toast.success(bookmarked ? "Bookmark removed" : "Bookmark added!");
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resource?.title,
        text: resource?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-surface rounded w-1/4"></div>
            <div className="bg-surface rounded-2xl p-8 h-96"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface rounded-2xl p-6 h-48"></div>
              <div className="bg-surface rounded-2xl p-6 h-48"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-semibold text-text mb-4">
            Resource not found
          </h1>
          <Link to="/resources">
            <Button icon={<FiArrowLeft />}>Back to Resources</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/resources">
            <Button variant="ghost" icon={<FiArrowLeft />} size="sm">
              Back to Resources
            </Button>
          </Link>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-2xl overflow-hidden mb-8"
        >
          {/* Header with badges */}
          <div className="p-8 border-b border-border">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium">
                  {resource.category}
                </span>
                {resource.isVerified && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-sm">
                    <FiCheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
                {resource.isFeatured && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-warning/10 text-warning text-sm">
                    <FiStar className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg hover:bg-bg-soft transition-colors"
                  title="Share"
                >
                  <FiShare2 className="w-5 h-5 text-text-soft" />
                </button>
                {isAuthenticated && (
                  <button
                    onClick={handleBookmark}
                    className={`p-2 rounded-lg transition-colors ${
                      bookmarked
                        ? "text-brand"
                        : "text-text-soft hover:text-brand"
                    }`}
                    title={bookmarked ? "Remove bookmark" : "Bookmark"}
                  >
                    <FiBookmark
                      className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Title and Description */}
            <h1 className="text-3xl font-semibold text-text mb-4">
              {resource.title}
            </h1>
            <p className="text-lg text-text-soft mb-8">
              {resource.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-soft">
              <div className="flex items-center gap-2">
                <FiEye className="w-4 h-4" />
                <span>{resource.visits || 0} views</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="w-4 h-4" />
                <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
              </div>
              {resource.submittedBy && (
                <div>
                  Submitted by{" "}
                  <Link
                    to={`/users/${resource.submittedBy._id}`}
                    className="text-brand hover:text-brand/80"
                  >
                    {resource.submittedBy.username}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Action Section */}
          <div className="p-8 bg-bg-soft">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Button
                  variant={upvoted ? "primary" : "outline"}
                  onClick={handleUpvote}
                  icon={<FiHeart className={upvoted ? "fill-current" : ""} />}
                  disabled={!isAuthenticated}
                >
                  {upvoted ? "Upvoted" : "Upvote"} • {resource.upvotes || 0}
                </Button>
                {!isAuthenticated && (
                  <span className="text-sm text-text-soft">
                    Sign in to upvote
                  </span>
                )}
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  icon={<FiExternalLink />}
                  className="w-full sm:w-auto"
                >
                  Visit Website
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/resources?search=${tag}`}
                  className="px-3 py-1.5 rounded-full bg-bg-soft text-text-soft hover:text-text hover:bg-bg transition-colors text-sm"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-text mb-6">
              Related Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedResources.map((related) => (
                <Link
                  key={related._id}
                  to={`/resources/${related._id}`}
                  className="block"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-surface border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 rounded bg-brand/10 text-brand">
                        {related.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-text-soft">
                        <FiHeart className="w-4 h-4" />
                        {related.upvotes}
                      </div>
                    </div>
                    <h4 className="font-medium text-text mb-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-text-soft line-clamp-2">
                      {related.description}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDetail;
