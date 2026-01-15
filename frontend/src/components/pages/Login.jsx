// src/components/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiGithub, FiTwitter } from "react-icons/fi";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(formData);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
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
            Welcome back
          </h1>
          <p className="text-text-soft">Sign in to your account</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              icon={<FiMail className="w-5 h-5" />}
              disabled={loading}
            />

            <div>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                icon={<FiLock className="w-5 h-5" />}
                disabled={loading}
              />
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-brand hover:text-brand/80"
                >
                  Forgot password?
                </Link>
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
              Sign In
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface text-text-soft">
                  Or continue with
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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-brand font-medium hover:text-brand/80"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-text-soft">
          By signing in, you agree to our{" "}
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

export default Login;
