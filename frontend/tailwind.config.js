// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
        },
        
        // Accent colors
        accent: {
          cyan: "var(--accent-cyan)",
          emerald: "var(--accent-emerald)",
          amber: "var(--accent-amber)",
          rose: "var(--accent-rose)",
          violet: "var(--accent-violet)",
        },
        
        // Category colors
        category: {
          tools: "var(--category-tools)",
          apis: "var(--category-apis)",
          templates: "var(--category-templates)",
          courses: "var(--category-courses)",
          hosting: "var(--category-hosting)",
          libraries: "var(--category-libraries)",
          databases: "var(--category-databases)",
          learning: "var(--category-learning)",
        },
        
        // Status colors
        status: {
          verified: "var(--status-verified)",
          featured: "var(--status-featured)",
          trending: "var(--status-trending)",
          beta: "var(--status-beta)",
          new: "var(--status-new)",
        },
        
        // Surface colors
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-highlight": "var(--surface-highlight)",
        
        // Text colors
        text: "var(--text)",
        "text-soft": "var(--text-soft)",
        "text-muted": "var(--text-muted)",
        "text-on-brand": "var(--text-on-brand)",
        
        // Border colors
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        "border-subtle": "var(--border-subtle)",
      },
      
      // Background images
      backgroundImage: {
        "gradient-brand": "var(--gradient-brand)",
        "gradient-cyan": "var(--gradient-cyan)",
        "gradient-emerald": "var(--gradient-emerald)",
        "gradient-sunset": "var(--gradient-sunset)",
      },
      
      // Box shadows
      boxShadow: {
        "soft": "var(--shadow)",
        "md-soft": "var(--shadow-md)",
        "lg-soft": "var(--shadow-lg)",
        "xl-soft": "var(--shadow-xl)",
        "glow-brand": "var(--glow-brand)",
        "glow-cyan": "var(--glow-cyan)",
        "glow-emerald": "var(--glow-emerald)",
        "glow-amber": "var(--glow-amber)",
      },
      
      // Border radius
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      
      // Animations
      animation: {
        "pulse-soft": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
      
      // Keyframes
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      
      // Font family
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
      },
    },
  },
  
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(12px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(12px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.dark .glass': {
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
        '.text-gradient': {
          background: 'var(--gradient-brand)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.card-hover': {
          '&:hover': {
            transform: 'translateY(-4px)',
            'border-color': 'var(--brand-300)',
            'box-shadow': 'var(--shadow-lg), var(--glow-brand)',
          },
        },
      });
    },
  ],
};