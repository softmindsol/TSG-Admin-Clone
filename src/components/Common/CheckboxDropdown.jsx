import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const CheckboxDropdown = ({
  label,
  placeholder = "Select option",
  options = [],
  value = "",
  onChange,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Single-select toggle
  const selectOption = (optionValue) => {
    onChange?.(optionValue);
    setOpen(false); // close after selection
  };

  // Show selected label in placeholder
  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-base font-medium text-[#081722] mb-2">
          {label}
        </label>
      )}

      {/* Dropdown Trigger */}
      <div
        className="w-full h-11 pl-4 pr-4  border border-gray-300 rounded-md bg-white text-xs md:text-sm text-gray-700 flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className={selectedLabel ? "text-gray-900" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <MdKeyboardArrowDown className="w-5 h-5 text-gray-600" />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="mt-1 border border-gray-200 rounded-md bg-white shadow-md p-2 max-h-60 overflow-y-auto z-10 relative">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 px-2 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => selectOption(option.value)}
            >
              <input
                type="checkbox"
                readOnly
                checked={value === option.value}
                className="w-4 h-4 accent-black border-gray-300 rounded"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
