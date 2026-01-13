import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { FiLink, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as resourcesService from "../../services/resources";
import Button from "../ui/Button";
import Input from "../ui/Input";

/*
  DevFreebies Submit Resource
  - Token based
  - Dark / light safe
  - SaaS-grade form
*/

const SubmitResource = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Prevent toast spam
  const errorToast = useRef(null);
  const showError = (msg) => {
    if (errorToast.current) return;
    errorToast.current = toast.error(msg);
    setTimeout(() => {
      errorToast.current = null;
    }, 3000);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    category: "",
    tags: [],
  });

  const availableTags = [
    "javascript",
    "react",
    "nodejs",
    "python",
    "free",
    "opensource",
    "ui-ux",
    "frontend",
    "backend",
    "api",
    "cloud",
    "css",
    "html",
    "hosting",
    "database",
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      showError("Please login to submit resources");
      navigate("/login");
      return;
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await resourcesService.getCategories();
      setCategories(response.data || []);
    } catch {
      showError("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => {
      const alreadySelected = prev.tags.includes(tag);

      if (!alreadySelected && prev.tags.length >= 5) {
        showError("You can select max 5 tags");
        return prev;
      }

      return {
        ...prev,
        tags: alreadySelected
          ? prev.tags.filter((t) => t !== tag)
          : [...prev.tags, tag],
      };
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showError("Title is required");
      return false;
    }
    if (!formData.url.trim()) {
      showError("Website URL is required");
      return false;
    }
    if (!formData.category) {
      showError("Please select a category");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);

    try {
      await resourcesService.createResource(formData);
      toast.success("Resource submitted");
      setTimeout(() => navigate("/resources"), 700);
    } catch (err) {
      const msg = err.response?.data?.message || "Submission failed";
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-text mb-3">
              Submit a Resource
            </h1>
            <p className="text-text-soft">
              Share a free developer tool with the community
            </p>
          </div>

          {/* Form */}
          <div className="bg-surface border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Title"
                name="title"
                placeholder="Vercel – Frontend deployment"
                value={formData.title}
                onChange={handleChange}
                required
                icon={<FiTag />}
              />

              <div>
                <label className="text-sm text-text-soft block mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text placeholder-text-soft focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <p className="text-xs text-text-soft mt-1">
                  {formData.description.length}/500
                </p>
              </div>

              <Input
                label="Website URL"
                name="url"
                placeholder="https://vercel.com"
                value={formData.url}
                onChange={handleChange}
                required
                icon={<FiLink />}
              />

              <div>
                <label className="text-sm text-text-soft block mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text focus:outline-none"
                >
                  <option value="">Select</option>
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-sm text-text-soft mb-2">Tags (max 5)</p>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition ${
                        formData.tags.includes(tag)
                          ? "bg-brand-soft text-brand border-brand/40"
                          : "bg-bg-soft text-text-soft border-border hover:text-text"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" loading={loading}>
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 bg-bg-soft border border-border rounded-xl p-6 text-text-soft text-sm">
            • Must be free or have a free tier
            <br />• Use clear titles and real links
            <br />• Add relevant tags for discovery
            <br />• Spam will be removed
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitResource;
