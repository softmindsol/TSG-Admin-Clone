import React from "react";
import CustomHeading from "./CustomHeading";

const RadioSelect = ({ heading, name, options, selectedValue, onChange }) => {
  return (
    <div>
      <CustomHeading
        heading={heading}
        fontSize="text-base"
        textAlign="text-left"
      />

      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center text-base text-paragraphText mt-1 gap-3"
        >
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="accent-black"
          />
          <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioSelect;
