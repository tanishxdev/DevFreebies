// src/components/pages/Bookmarks.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiBookmark } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as userService from "../../services/users";
import Button from "../ui/Button";
import Card from "../ui/Card";

const Bookmarks = () => {
  const { isAuthenticated } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    }
  }, [isAuthenticated]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await userService.getBookmarks();
      setBookmarks(res.data || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (resourceId) => {
    try {
      await userService.toggleBookmark(resourceId);
      // Remove from local state
      setBookmarks((prev) => prev.filter((r) => r._id !== resourceId));
      toast.success("Bookmark removed");
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  const handleUpvote = () => {
    // Upvote functionality - would need to be implemented
    toast.success("Feature coming soon!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-surface border border-border rounded-2xl p-12">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-semibold text-text mb-4">
              Sign in to view bookmarks
            </h1>
            <p className="text-lg text-text-soft mb-8">
              Save resources you find useful and access them anytime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="primary" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-text mb-4">
            Your Bookmarks
          </h1>
          <p className="text-lg text-text-soft">
            All resources you've saved for later
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-bg rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-bg rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-bg rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : bookmarks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((resource) => (
                <Card
                  key={resource._id}
                  resource={resource}
                  onUpvote={handleUpvote}
                  onBookmark={handleBookmark}
                  isBookmarked={true}
                  showActions={true}
                />
              ))}
            </div>

            {bookmarks.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-semibold text-text mb-2">
                  No bookmarks yet
                </h3>
                <p className="text-text-soft mb-6 max-w-md mx-auto">
                  When you find resources you like, click the bookmark icon to
                  save them here
                </p>
                <Link to="/resources">
                  <Button variant="primary" icon={<FiBookmark />}>
                    Browse Resources
                  </Button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-text mb-2">
              No bookmarks yet
            </h3>
            <p className="text-text-soft mb-6 max-w-md mx-auto">
              When you find resources you like, click the bookmark icon to save
              them here
            </p>
            <Link to="/resources">
              <Button variant="primary" icon={<FiBookmark />}>
                Browse Resources
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
