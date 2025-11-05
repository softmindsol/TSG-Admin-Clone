import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const SelectInput = ({
  label,
  placeholder = "Select an option",
  id,
  options = [],
  value,
  onChange,
  className = "",
  required = false,
}) => {
  const [otherValue, setOtherValue] = useState("");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue !== "other") {
      setOtherValue("");
      onChange?.(selectedValue);
    } else {
      onChange?.(""); // clear until user types
    }
  };

  const handleOtherChange = (e) => {
    const val = e.target.value;
    setOtherValue(val);
    onChange?.(val);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-base font-medium text-[#081722] mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          value={value || ""}
          onChange={handleSelectChange}
          className="w-full h-11 pl-4 pr-10 border border-gray-300 rounded-md bg-white text-xs md:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          required={required}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}

          <option value="other">Other</option>
        </select>

        <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
      </div>

      {/* Always show input if "Other" is selected */}
      {value === "other" && (
        <input
          type="text"
          placeholder="Please specify..."
          value={otherValue}
          onChange={handleOtherChange}
          className="mt-3 w-full h-11 px-4 border border-gray-300 rounded-md bg-white text-xs md:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default SelectInput;
