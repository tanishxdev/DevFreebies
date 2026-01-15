// src/components/pages/Resources.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiChevronDown,
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as resourcesService from "../../services/resources";
import * as userService from "../../services/users";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

const Resources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [upvotedResources, setUpvotedResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  // Get query params
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "-createdAt";
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    fetchData();
  }, [search, category, sort, page]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch resources
      const resourcesRes = await resourcesService.getResources({
        search,
        category,
        sort,
        page,
        limit: 12,
      });

      setResources(resourcesRes.data || []);
      setTotal(resourcesRes.total || 0);

      // Fetch categories if not already loaded
      if (categories.length === 0) {
        const categoriesRes = await resourcesService.getCategories();
        setCategories(categoriesRes.data || []);
      }

      // Fetch bookmarks if authenticated
      if (isAuthenticated) {
        try {
          const bookmarksRes = await userService.getBookmarks();
          setBookmarks(bookmarksRes.data?.map((r) => r._id) || []);

          // Get upvoted resources from user data
          if (user) {
            setUpvotedResources(user.upvotedResources || []);
          }
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSearch = formData.get("search");

    const params = new URLSearchParams(searchParams);
    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleCategoryChange = (newCategory) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleSortChange = (newSort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    setSearchParams(params);
  };

  const handleUpvote = async (resourceId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await resourcesService.upvoteResource(resourceId);

      // Update local state optimistically
      setResources((prev) =>
        prev.map((resource) => {
          if (resource._id === resourceId) {
            const wasUpvoted = upvotedResources.includes(resourceId);
            return {
              ...resource,
              upvotes: wasUpvoted ? resource.upvotes - 1 : resource.upvotes + 1,
            };
          }
          return resource;
        })
      );

      // Update upvoted resources list
      if (upvotedResources.includes(resourceId)) {
        setUpvotedResources((prev) => prev.filter((id) => id !== resourceId));
      } else {
        setUpvotedResources((prev) => [...prev, resourceId]);
      }
    } catch (error) {
      toast.error("Failed to upvote resource");
    }
  };

  const handleBookmark = async (resourceId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await userService.toggleBookmark(resourceId);

      // Update local state
      if (bookmarks.includes(resourceId)) {
        setBookmarks((prev) => prev.filter((id) => id !== resourceId));
        toast.success("Bookmark removed");
      } else {
        setBookmarks((prev) => [...prev, resourceId]);
        toast.success("Bookmark added");
      }
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-gradient-to-b from-bg-soft to-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-semibold text-text mb-4">
              Discover Resources
            </h1>
            <p className="text-lg text-text-soft mb-8">
              Browse {total} free tools, APIs, libraries and resources for
              developers
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mb-6">
              <div className="relative">
                <Input
                  name="search"
                  placeholder="Search resources by name, description..."
                  defaultValue={search}
                  className="pl-12 pr-12 py-3 text-lg"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-soft w-5 h-5" />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.delete("search");
                      setSearchParams(params);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-soft hover:text-text"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                icon={showFilters ? <FiX /> : <FiFilter />}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-text-soft">View:</span>
                <Button
                  variant={viewMode === "grid" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  icon={<FiGrid />}
                />
                <Button
                  variant={viewMode === "list" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  icon={<FiList />}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface border-b border-border overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="appearance-none bg-bg-soft border border-border rounded-xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-soft w-4 h-4" />
                </div>

                {/* Sort Options */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="appearance-none bg-bg-soft border border-border rounded-xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent"
                  >
                    <option value="-createdAt">Newest First</option>
                    <option value="createdAt">Oldest First</option>
                    <option value="-upvotes">Most Upvoted</option>
                    <option value="upvotes">Least Upvoted</option>
                    <option value="title">Title A-Z</option>
                    <option value="-title">Title Z-A</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-soft w-4 h-4" />
                </div>

                {/* Active Filters Display */}
                {(search || category) && (
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-sm text-text-soft">Active:</span>
                    {search && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm">
                        Search: {search}
                        <button
                          onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.delete("search");
                            setSearchParams(params);
                          }}
                          className="ml-1 hover:text-brand/80"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {category && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm">
                        Category: {category}
                        <button
                          onClick={() => handleCategoryChange("")}
                          className="ml-1 hover:text-brand/80"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-bg rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-bg rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-bg rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-bg rounded"></div>
              </div>
            ))}
          </div>
        ) : resources.length > 0 ? (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {resources.map((resource) => (
                <Card
                  key={resource._id}
                  resource={resource}
                  onUpvote={handleUpvote}
                  onBookmark={handleBookmark}
                  isBookmarked={bookmarks.includes(resource._id)}
                  upvoted={upvotedResources.includes(resource._id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {total > 12 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="ghost"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", Math.max(1, page - 1).toString());
                    setSearchParams(params);
                  }}
                  disabled={page <= 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-text-soft">
                  Page {page} of {Math.ceil(total / 12)}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", (page + 1).toString());
                    setSearchParams(params);
                  }}
                  disabled={page >= Math.ceil(total / 12)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-text mb-2">
              No resources found
            </h3>
            <p className="text-text-soft mb-6">
              {search || category
                ? "Try adjusting your search or filters"
                : "Be the first to submit a resource!"}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button onClick={clearFilters}>Clear Filters</Button>
              {isAuthenticated && (
                <Button variant="primary" onClick={() => navigate("/submit")}>
                  Submit Resource
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// AnimatePresence component for motion
const AnimatePresence = ({ children }) => children;

export default Resources;
