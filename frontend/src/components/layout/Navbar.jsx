import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = isAuthenticated
    ? [
        { name: "Resources", path: "/resources" },
        { name: "Submit", path: "/submit" },
        { name: "Dashboard", path: "/dashboard" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Features", hash: "features" },
        { name: "Resources", path: "/resources" },
        { name: "FAQ", path: "/faq" },
      ];

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);

    if (link.path === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (link.hash) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById(link.hash)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document
          .getElementById(link.hash)
          ?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    navigate(link.path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick({ path: "/" })}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center">
              <span className="text-brand-foreground font-bold text-lg">D</span>
            </div>
            <span className="text-lg font-semibold text-text">DevFreebies</span>
          </button>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`text-sm transition ${
                  location.pathname === link.path
                    ? "text-brand"
                    : "text-text-soft hover:text-text"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-bg-soft border border-border text-text"
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </motion.button>

            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen((p) => !p)}>
                  <img
                    src={user?.avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full ring-2 ring-brand/40"
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-3 w-48 rounded-xl bg-surface border border-border shadow-soft overflow-hidden"
                    >
                      <button
                        onClick={logout}
                        className="w-full px-4 py-3 text-left text-danger hover:bg-bg-soft"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="md:hidden p-2 rounded-lg bg-bg-soft"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
