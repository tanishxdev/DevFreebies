import { motion } from "framer-motion";
import { useState } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

/*
  DevFreebies Register
  - SaaS look
  - Token based
  - Dark & light safe
*/

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.length < 3) newErrors.username = "Min 3 characters";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const { confirmPassword, ...data } = formData;
    const result = await register(data);
    if (!result.success) setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-surface border border-border rounded-2xl p-10 shadow-soft">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-text mb-2">
              Create your account
            </h2>
            <p className="text-text-soft text-sm">
              Start discovering the best developer tools
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="tanishxdev"
              icon={<FiUser />}
            />

            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              icon={<FiMail />}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              icon={<FiLock />}
            />

            <Input
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              icon={<FiLock />}
            />

            <label className="flex items-start gap-2 text-sm text-text-soft">
              <input type="checkbox" required className="accent-brand mt-1" />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-brand hover:opacity-80">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/policy" className="text-brand hover:opacity-80">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-soft">
            Already have an account?{" "}
            <Link to="/login" className="text-brand hover:opacity-80">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
