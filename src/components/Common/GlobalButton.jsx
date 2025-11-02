import React from "react";

const GlobalButton = ({
  children,
  onClick,
  variant = "primary", // "primary" | "secondary"
  icon: Icon, // pass React icon component
  className = "",
  iw = "w-4", // icon width
  ih = "h-4", // icon height
  ...props
}) => {
  const baseStyles =
    "h-10 px-4 font-normal rounded-lg flex items-center justify-center gap-2 transition-colors";

  const variantStyles =
    variant === "primary"
      ? "bg-[#081722] text-white text-base cursor-pointer hover:bg-gray-900 border border-gray-800"
      : "text-gray-800 border cursor-pointer border-gray-800 hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} font-poppins ${className}`}
      {...props}
    >
      {Icon && <Icon className={`${iw} ${ih} `} />}
      {children}
    </button>
  );
};

export default GlobalButton;
