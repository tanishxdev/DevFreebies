import { forwardRef } from "react";

/*
  DevFreebies Input
  Uses design tokens so it matches:
  - dark / light
  - brand color
  - surface system
*/

const Input = forwardRef(
  ({ label, error, type = "text", className = "", icon, ...props }, ref) => {
    // Force URL inputs to behave like text to avoid browser popups
    const inputType = type === "url" ? "text" : type;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-text-soft mb-2">
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-soft">
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={inputType}
            inputMode={type === "url" ? "url" : undefined}
            className={`
              w-full px-4 py-2 
              ${icon ? "pl-10" : ""}
              border border-border 
              rounded-lg 
              bg-surface 
              text-text 
              placeholder-text-soft
              focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent
              disabled:bg-bg-soft disabled:cursor-not-allowed
              transition-all duration-200
              ${error ? "border-danger focus:ring-danger" : ""}
              ${className}
            `}
            {...props}
          />
        </div>

        {/* Error message */}
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
