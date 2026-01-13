import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMessageSquare } from "react-icons/fi";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const Feedback = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Thanks for helping improve DevFreebies");
      setFormData({ email: "", subject: "", message: "" });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-bg px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-3xl p-10"
        >
          <h1 className="text-4xl font-semibold mb-3">Send feedback</h1>
          <p className="text-text-soft mb-10">
            Help improve DevFreebies by reporting bugs or suggesting tools.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon={<FiMail />}
              required
            />

            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <div>
              <label className="text-sm mb-2 block">Message</label>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-border"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              icon={<FiMessageSquare />}
              className="w-full"
            >
              Send feedback
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
