export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        surface: "var(--surface)",
        text: "var(--text)",
        "text-soft": "var(--text-soft)",
        border: "var(--border)",

        brand: "var(--brand)",
        "brand-soft": "var(--brand-soft)",
        "brand-foreground": "var(--brand-foreground)",

        success: "var(--success)",
        danger: "var(--danger)",
        warning: "var(--warning)",
      },
    },
  },
};
