// src/components/pages/Feedback.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

const Feedback = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    subject: "",
    message: "",
    type: "general",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "general",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-border rounded-2xl p-12"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-semibold text-text mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-text-soft mb-8">
              Your feedback has been received. We'll review it and get back to
              you if needed.
            </p>
            <a href="/">
              <Button variant="primary">Back to Home</Button>
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-text mb-4">
              Share Your Feedback
            </h1>
            <p className="text-lg text-text-soft">
              We'd love to hear your thoughts, suggestions, or issues
            </p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                  icon={<FiMail />}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Feedback Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["general", "bug", "suggestion", "feature"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, type }))}
                      className={`px-4 py-3 rounded-xl border-2 text-center transition-all ${
                        formData.type === type
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-border hover:border-brand/50 text-text-soft"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Brief description of your feedback"
              />

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide details about your feedback, suggestion, or issue..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-bg text-text placeholder:text-text-soft focus:outline-none focus:border-brand transition-all duration-200 disabled:opacity-50 resize-none"
                  rows="6"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={submitting}
                icon={<FiSend />}
              >
                Send Feedback
              </Button>

              <p className="text-center text-sm text-text-soft">
                We typically respond within 24-48 hours
              </p>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-surface border border-border">
              <FiMail className="w-8 h-8 text-brand mx-auto mb-3" />
              <h3 className="font-medium text-text mb-2">Email Us</h3>
              <p className="text-sm text-text-soft">contact@devfreebies.com</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-surface border border-border">
              <FiMessageSquare className="w-8 h-8 text-brand mx-auto mb-3" />
              <h3 className="font-medium text-text mb-2">GitHub Issues</h3>
              <p className="text-sm text-text-soft">Report bugs on GitHub</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-surface border border-border">
              <div className="w-8 h-8 text-brand mx-auto mb-3">💬</div>
              <h3 className="font-medium text-text mb-2">Community</h3>
              <p className="text-sm text-text-soft">
                Join our Discord community
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
