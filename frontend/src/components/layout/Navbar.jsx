// src/components/layout/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiGrid,
  FiPlusCircle,
  FiBookmark,
  FiUser,
  FiMenu,
  FiX,
  FiShield,
  FiSun,
  FiMoon,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";

const Navbar = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "Resources", path: "/resources", icon: FiGrid },
    ...(isAuthenticated
      ? [
          { name: "Submit", path: "/submit", icon: FiPlusCircle },
          { name: "Bookmarks", path: "/bookmarks", icon: FiBookmark },
        ]
      : []),
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-bg/80 backdrop-blur-lg border-b border-border"
            : "bg-bg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-soft flex items-center justify-center">
                <span className="text-brand-foreground font-bold text-lg">
                  DF
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text">DevFreebies</h1>
                <p className="text-xs text-text-soft">For Developers</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-text-soft hover:text-text hover:bg-bg-soft transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}

              {/* Admin Link - Only for admins */}
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-brand hover:bg-brand/10 transition-colors"
                >
                  <FiShield className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-bg-soft transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FiSun className="w-5 h-5 text-text" />
                ) : (
                  <FiMoon className="w-5 h-5 text-text" />
                )}
              </button>

              {/* Auth Buttons / User Menu */}
              <div className="hidden md:flex items-center gap-2">
                {isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <Link to="/profile">
                      <Button variant="ghost" size="sm">
                        <FiUser className="w-4 h-4" />
                        {user.username}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-danger"
                    >
                      <FiLogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm">
                        <FiLogIn className="w-4 h-4" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="primary" size="sm">
                        <FiUserPlus className="w-4 h-4" />
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-bg-soft transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <FiX className="w-6 h-6 text-text" />
                ) : (
                  <FiMenu className="w-6 h-6 text-text" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-bg-soft transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}

              {/* Admin Link */}
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand hover:bg-brand/10 transition-colors"
                >
                  <FiShield className="w-5 h-5" />
                  Admin Dashboard
                </Link>
              )}

              {/* Auth Section */}
              <div className="pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-bg-soft transition-colors mb-2"
                    >
                      <FiUser className="w-5 h-5" />
                      Profile ({user.username})
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-danger hover:bg-danger/10 transition-colors w-full"
                    >
                      <FiLogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-bg-soft transition-colors mb-2"
                    >
                      <FiLogIn className="w-5 h-5" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-brand text-brand-foreground hover:bg-brand/90 transition-colors"
                    >
                      <FiUserPlus className="w-5 h-5" />
                      Sign Up Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
