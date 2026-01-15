// src/components/pages/Register.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiCheck,
  FiGithub,
  FiLock,
  FiMail,
  FiTwitter,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        navigate("/");
      } else {
        setErrors({ general: result.message });
      }
    } catch (err) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-brand-soft flex items-center justify-center mx-auto">
              <span className="text-brand-foreground font-bold text-2xl">
                DF
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-semibold text-text mb-2">
            Join DevFreebies
          </h1>
          <p className="text-text-soft">Create your free account</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">
          {errors.general && (
            <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="john_doe"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              icon={<FiUser className="w-5 h-5" />}
              disabled={loading}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<FiMail className="w-5 h-5" />}
              disabled={loading}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<FiLock className="w-5 h-5" />}
              disabled={loading}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={<FiCheck className="w-5 h-5" />}
              disabled={loading}
            />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 rounded border-border text-brand focus:ring-brand/50 focus:ring-offset-0"
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-text-soft">
                  I agree to the{" "}
                  <Link to="/terms" className="text-brand hover:text-brand/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/policy" className="text-brand hover:text-brand/80">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    id="newsletter"
                    defaultChecked
                    className="w-4 h-4 rounded border-border text-brand focus:ring-brand/50 focus:ring-offset-0"
                  />
                </div>
                <label htmlFor="newsletter" className="text-sm text-text-soft">
                  Send me updates about new features and resources (optional)
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Create Account
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface text-text-soft">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                icon={<FiGithub className="w-5 h-5" />}
                disabled={loading}
              >
                GitHub
              </Button>
              <Button
                variant="secondary"
                icon={<FiTwitter className="w-5 h-5" />}
                disabled={loading}
              >
                Twitter
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-text-soft">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand font-medium hover:text-brand/80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-text-soft">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-brand hover:text-brand/80">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/policy" className="text-brand hover:text-brand/80">
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
