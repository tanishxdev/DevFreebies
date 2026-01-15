// src/components/pages/SubmitResource.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle, FiFileText, FiImage, FiLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as resourcesService from "../../services/resources";
import Button from "../ui/Button";
import Input from "../ui/Input";

const SubmitResource = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    category: "",
    tags: [],
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([
    "javascript",
    "react",
    "nodejs",
    "python",
    "free",
    "opensource",
    "beginner",
    "advanced",
    "ui-ux",
    "mobile",
    "devops",
    "database",
    "frontend",
    "backend",
    "documentation",
    "api",
    "testing",
    "deployment",
    "cloud",
    "css",
    "html",
  ]);
  const [userStats, setUserStats] = useState({
    submittedCount: 0,
    limit: 3,
  });

  useEffect(() => {
    fetchUserStats();
    fetchCategories();
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      const stats = await resourcesService.getUserResourceStats();
      setUserStats({
        submittedCount: stats.submittedCount || 0,
        limit: 3,
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await resourcesService.getCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags.slice(0, 5) }; // Limit to 5 tags
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check submission limit
    if (userStats.submittedCount >= userStats.limit) {
      toast.error(`You can only submit ${userStats.limit} resources`);
      return;
    }

    // Validate required fields
    if (
      !formData.title ||
      !formData.description ||
      !formData.url ||
      !formData.category
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate URL
    try {
      new URL(formData.url);
    } catch (err) {
      toast.error("Please enter a valid URL");
      return;
    }

    setSubmitting(true);

    try {
      const resourceData = {
        ...formData,
        tags: formData.tags,
      };

      await resourcesService.createResource(resourceData);

      toast.success(
        "Resource submitted successfully! It will be reviewed by our team."
      );
      navigate("/resources");
    } catch (error) {
      const message = error.response?.data?.message || "Submission failed";

      if (error.response?.status === 400) {
        if (message.includes("already exists")) {
          toast.error("This resource URL already exists in our database");
        } else if (message.includes("maximum")) {
          toast.error(message);
          setUserStats((prev) => ({ ...prev, submittedCount: prev.limit }));
        } else {
          toast.error(message);
        }
      } else {
        toast.error("Failed to submit resource. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (userStats.submittedCount / userStats.limit) * 100;

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-text mb-4">
              Submit a Resource
            </h1>
            <p className="text-lg text-text-soft">
              Share a free tool, API, library, or resource with the developer
              community
            </p>
          </div>

          {/* Submission Limit Indicator */}
          {userStats.submittedCount > 0 && (
            <div className="mb-8 bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="w-5 h-5 text-brand" />
                  <span className="font-medium text-text">
                    Submission Limit: {userStats.submittedCount}/
                    {userStats.limit}
                  </span>
                </div>
                <span className="text-sm text-text-soft">
                  {userStats.limit - userStats.submittedCount} remaining
                </span>
              </div>
              <div className="relative h-2 bg-bg-soft rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                    progress >= 100 ? "bg-danger" : "bg-brand"
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-sm text-text-soft mt-3">
                You can submit up to {userStats.limit} resources. This prevents
                spam and ensures quality.
              </p>
            </div>
          )}

          {/* Form */}
          <div className="bg-surface border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Resource Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Vercel - Deploy websites with one click"
                  required
                  icon={<FiFileText className="w-5 h-5" />}
                  disabled={submitting}
                />
                <p className="mt-2 text-sm text-text-soft">
                  Clear, descriptive title that explains what the resource does
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe what this resource does and why it's useful..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-bg text-text placeholder:text-text-soft focus:outline-none focus:border-brand transition-all duration-200 disabled:opacity-50 resize-none"
                  rows="4"
                  maxLength="500"
                  required
                  disabled={submitting}
                />
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-text-soft">
                    Max 500 characters. Be concise but informative.
                  </p>
                  <span className="text-sm text-text-soft">
                    {formData.description.length}/500
                  </span>
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  URL *
                </label>
                <Input
                  name="url"
                  type="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  required
                  icon={<FiLink className="w-5 h-5" />}
                  disabled={submitting}
                />
                <p className="mt-2 text-sm text-text-soft">
                  Must be a working, publicly accessible URL
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, category: cat.name }))
                      }
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.category === cat.name
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-border hover:border-brand/50 hover:bg-bg-soft text-text-soft"
                      } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={submitting}
                    >
                      <div className="font-medium">{cat.name}</div>
                      <div className="text-xs mt-1">{cat.count} resources</div>
                    </button>
                  ))}
                </div>
                {!formData.category && (
                  <p className="mt-2 text-sm text-danger">
                    Please select a category
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Tags (Optional)
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand text-brand-foreground text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className="ml-1 hover:opacity-80"
                        disabled={submitting}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        formData.tags.includes(tag)
                          ? "bg-brand/20 text-brand border border-brand/30"
                          : "bg-bg-soft text-text-soft hover:bg-bg hover:text-text"
                      } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={submitting}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-text-soft">
                  Select up to 5 tags to help others discover your resource
                </p>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Image URL (Optional)
                </label>
                <Input
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.png"
                  icon={<FiImage className="w-5 h-5" />}
                  disabled={submitting}
                />
                <p className="mt-2 text-sm text-text-soft">
                  Logo or screenshot of the resource (square or 16:9
                  recommended)
                </p>
              </div>

              {/* Guidelines */}
              <div className="bg-bg-soft border border-border rounded-xl p-6">
                <h3 className="font-medium text-text mb-3">
                  Submission Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-text-soft">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">✓</div>
                    <span>Resource must be completely free to use or have free tier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">✓</div>
                    <span>No affiliate links or referral codes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">✓</div>
                    <span>Provide accurate and helpful descriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">✓</div>
                    <span>
                      No duplicate submissions (check existing resources first)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">✓</div>
                    <span>
                      All submissions are reviewed before appearing publicly
                    </span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-border">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={submitting}
                  disabled={
                    submitting ||
                    userStats.submittedCount >= userStats.limit ||
                    !formData.title ||
                    !formData.description ||
                    !formData.url ||
                    !formData.category
                  }
                >
                  {userStats.submittedCount >= userStats.limit
                    ? "Submission Limit Reached"
                    : "Submit Resource for Review"}
                </Button>
                <p className="text-center text-sm text-text-soft mt-4">
                  Your submission will be reviewed by our team before appearing
                  on the site. You'll be notified once it's approved.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitResource;
