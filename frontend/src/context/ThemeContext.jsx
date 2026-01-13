import { createContext, useContext, useEffect, useState } from "react";

/*
  DevFreebies Theme System

  We control theme by toggling `dark` class on <html>.
  Tailwind + CSS variables automatically react to it.
*/

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Read theme from localStorage or fallback to system
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";

    const stored = localStorage.getItem("theme");
    if (stored) return stored;

    // Use OS preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = {
    theme, // "light" or "dark"
    isDark: theme === "dark",
    toggleTheme, // function
    setTheme, // direct control if needed
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Hook for easy access
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
};
