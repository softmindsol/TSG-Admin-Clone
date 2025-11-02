import React from "react";
import Icons from "../../assets/icons/Icons";

// You can pass an SVG icon component as a prop
const StatCard = ({
  icon,
  title,
  value,
  change,
  changeType,
  footerText,
  button,
  buttonText,
}) => {
  const isIncrease = changeType === "increase";
  const changeColor = isIncrease ? "text-green-500" : "text-red-500";
  const Arrow = isIncrease ? <Icons.ArrowUp /> : <Icons.ArrowDown />;

  return (
    <div className=" bg-white p-3 lg:p-6 rounded-lg shadow-md flex items-center justify-between max-sm:flex-col max-sm:text-center">
      {/* Icon */}

      {/* Text Content */}
      <div>
        {/* Title */}
        <h3 className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-poppins">
          {title}
        </h3>

        {/* Value */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 my-1 font-poppins">
          {value}
        </p>

        {/* Change + Footer */}
        <div className="flex max-sm:justify-center items-center text-[9px] sm:text-[11px] text-xs lg:text-xs md:text-sm">
          {change && (
            <span className={`font-bold mr-1 flex ${changeColor}`}>
              {Arrow} {change}
            </span>
          )}
          {button && (
            <button className="text-[#1877F2] text-xs md:text-sm font-medium">
              {buttonText}{" "}
              <Icons.ArrowRight className="text-xs md:text-lg inline-block ml-1" />
            </button>
          )}
          <span className="text-gray-400 font-poppins">{footerText}</span>
        </div>
      </div>
      <div className="mb-2 sm:mb-0 flex-shrink-0 text-xl sm:text-2xl md:text-3xl">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
