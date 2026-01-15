// src/components/pages/Profile.jsx (if it doesn't exist, let me create it)

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiBookmark,
  FiCheck,
  FiEdit,
  FiMail,
  FiShield,
  FiUploadCloud,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as userService from "../../services/users";
import Button from "../ui/Button";
import Input from "../ui/Input";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [submittedResources, setSubmittedResources] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [profileRes, bookmarksRes] = await Promise.all([
        userService.getCurrentUserProfile(),
        userService.getBookmarks(),
      ]);

      setProfile(profileRes.data);
      setBookmarks(bookmarksRes.data || []);

      // Get submitted resources from profile
      if (profileRes.data?.submittedResources) {
        setSubmittedResources(profileRes.data.submittedResources);
      }

      // Initialize edit form
      setEditForm({
        username: profileRes.data?.username || "",
        email: profileRes.data?.email || "",
        avatar: profileRes.data?.avatar || "",
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const res = await userService.updateProfile(editForm);
      updateUser(res.data);
      setProfile(res.data);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      username: profile?.username || "",
      email: profile?.email || "",
      avatar: profile?.avatar || "",
    });
    setEditMode(false);
  };

  const handleBookmark = async (resourceId) => {
    try {
      await userService.toggleBookmark(resourceId);
      // Update local state
      setBookmarks((prev) =>
        prev.filter((resource) => resource._id !== resourceId)
      );
      toast.success("Bookmark removed");
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-surface rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-surface rounded-2xl p-8 h-96"></div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-surface rounded-2xl p-8 h-96"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-semibold text-text mb-4">
            Profile not found
          </h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-semibold text-text mb-2">
              Your Profile
            </h1>
            <p className="text-lg text-text-soft">
              Manage your account and contributions
            </p>
          </div>
          {user?.role === "admin" && (
            <Link to="/admin">
              <Button variant="primary" icon={<FiShield />}>
                Admin Dashboard
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-2xl p-8 sticky top-24">
              {/* Avatar */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={profile.avatar}
                    alt={profile.username}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-border"
                  />
                  {editMode && (
                    <button
                      onClick={() => {
                        const newAvatar = prompt(
                          "Enter new avatar URL:",
                          editForm.avatar
                        );
                        if (newAvatar !== null) {
                          setEditForm((prev) => ({
                            ...prev,
                            avatar: newAvatar,
                          }));
                        }
                      }}
                      className="absolute bottom-0 right-0 p-2 bg-brand text-brand-foreground rounded-full hover:bg-brand/90"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-2xl font-semibold text-text mt-4">
                  {profile.username}
                </h2>
                {user?.role === "admin" && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm mt-2">
                    <FiShield className="w-3 h-3" />
                    Admin
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-xl bg-bg-soft">
                  <div className="flex items-center gap-3">
                    <FiUploadCloud className="w-5 h-5 text-brand" />
                    <span className="text-text">Resources Submitted</span>
                  </div>
                  <span className="text-2xl font-semibold text-text">
                    {submittedResources.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-bg-soft">
                  <div className="flex items-center gap-3">
                    <FiBookmark className="w-5 h-5 text-brand" />
                    <span className="text-text">Bookmarks</span>
                  </div>
                  <span className="text-2xl font-semibold text-text">
                    {bookmarks.length}
                  </span>
                </div>
              </div>

              {/* Edit/Save Buttons */}
              {editMode ? (
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    onClick={handleSaveProfile}
                    icon={<FiCheck />}
                    className="w-full"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    icon={<FiX />}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setEditMode(true)}
                  icon={<FiEdit />}
                  className="w-full"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Form */}
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-text mb-6">
                Profile Information
              </h3>
              <div className="space-y-6">
                <Input
                  label="Username"
                  name="username"
                  value={editMode ? editForm.username : profile.username}
                  onChange={handleEditChange}
                  icon={<FiUser />}
                  disabled={!editMode}
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={editMode ? editForm.email : profile.email}
                  onChange={handleEditChange}
                  icon={<FiMail />}
                  disabled={!editMode}
                />
                {editMode && (
                  <Input
                    label="Avatar URL"
                    name="avatar"
                    value={editForm.avatar}
                    onChange={handleEditChange}
                    placeholder="https://example.com/avatar.jpg"
                    helperText="Enter a direct image URL for your avatar"
                  />
                )}
              </div>
            </div>

            {/* Submitted Resources */}
            <div className="bg-surface border border-border rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-text">
                  Your Resources
                </h3>
                <Link to="/submit">
                  <Button variant="primary" size="sm">
                    Submit New
                  </Button>
                </Link>
              </div>

              {submittedResources.length > 0 ? (
                <div className="space-y-4">
                  {submittedResources.map((resource) => (
                    <motion.div
                      key={resource._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-bg-soft hover:bg-bg transition-colors"
                    >
                      <div>
                        <Link
                          to={`/resources/${resource._id}`}
                          className="font-medium text-text hover:text-brand"
                        >
                          {resource.title}
                        </Link>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs px-2 py-1 rounded bg-brand/10 text-brand">
                            {resource.category}
                          </span>
                          <span className="text-xs text-text-soft">
                            {resource.upvotes} upvotes
                          </span>
                          {!resource.isVerified && (
                            <span className="text-xs px-2 py-1 rounded bg-warning/10 text-warning">
                              Pending Review
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/resources/${resource._id}`}
                        className="text-sm text-brand hover:text-brand/80"
                      >
                        View →
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📤</div>
                  <h4 className="text-lg font-medium text-text mb-2">
                    No resources submitted yet
                  </h4>
                  <p className="text-text-soft mb-6">
                    Share your first free resource with the community
                  </p>
                  <Link to="/submit">
                    <Button variant="primary">
                      Submit Your First Resource
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Bookmarks */}
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-text mb-6">
                Your Bookmarks
              </h3>

              {bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookmarks.slice(0, 4).map((resource) => (
                    <motion.div
                      key={resource._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-bg-soft border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Link
                          to={`/resources/${resource._id}`}
                          className="font-medium text-text hover:text-brand truncate"
                        >
                          {resource.title}
                        </Link>
                        <button
                          onClick={() => handleBookmark(resource._id)}
                          className="text-brand hover:text-brand/80"
                        >
                          <FiBookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <p className="text-sm text-text-soft line-clamp-2 mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded bg-bg text-text-soft">
                          {resource.category}
                        </span>
                        <Link
                          to={`/resources/${resource._id}`}
                          className="text-xs text-brand hover:text-brand/80"
                        >
                          View details
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h4 className="text-lg font-medium text-text mb-2">
                    No bookmarks yet
                  </h4>
                  <p className="text-text-soft mb-6">
                    Save resources you find useful for quick access later
                  </p>
                  <Link to="/resources">
                    <Button variant="outline">Browse Resources</Button>
                  </Link>
                </div>
              )}

              {bookmarks.length > 4 && (
                <div className="text-center mt-6">
                  <Link to="/bookmarks">
                    <Button variant="ghost">
                      View all bookmarks ({bookmarks.length})
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
