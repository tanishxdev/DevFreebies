import { motion } from "framer-motion";

/*
  DevFreebies Button
  Uses design tokens instead of hardcoded colors
  Works in dark & light automatically
*/

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand text-brand-foreground hover:opacity-90 shadow-soft",
    secondary: "bg-surface text-text border border-border hover:bg-bg-soft",
    outline: "border border-border text-text hover:bg-bg-soft",
    ghost: "text-text-soft hover:text-text hover:bg-bg-soft",
    danger: "bg-danger text-white hover:opacity-90",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <motion.button
      type={props.type || "button"}
      whileHover={{ scale: disabled || loading ? 1 : 1.04 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-text/40 border-t-transparent rounded-full animate-spin" />
          Loading
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </div>
      )}
    </motion.button>
  );
};

export default Button;
