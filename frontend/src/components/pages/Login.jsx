import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

/*
  DevFreebies Login
  - Uses design tokens
  - Supports redirect after login
  - Works in dark & light
*/

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate(redirect);
  }, [isAuthenticated, redirect, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData);
    if (!result.success) setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-surface border border-border rounded-2xl p-10 shadow-soft">
          <h2 className="text-2xl font-semibold text-text mb-2">
            Welcome back
          </h2>
          <p className="text-text-soft mb-8">
            Sign in to continue to DevFreebies
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              icon={<FiMail />}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              icon={<FiLock />}
              required
            />

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-text-soft">
                <input type="checkbox" className="accent-brand" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-brand hover:opacity-80"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-text-soft">
              Don’t have an account?{" "}
              <Link to="/register" className="text-brand hover:opacity-80">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
