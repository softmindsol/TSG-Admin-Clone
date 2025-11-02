import React from "react";

const StatusBadge = ({ status, icon }) => {
  const baseClasses =
    "px-2 py-1 rounded-full text-xs md:text-sm font-normal text-center";

  const statusClasses = {
    Active: "bg-green-100 w-24 text-green-600",
    Paid: "bg-green-100 w-20 text-green-600",
    Unpaid: "bg-red-100 w-24 text-red-600",
    DueSoon: "bg-[#F6B31D]/20 w-24 text-[#F6B31D]  rounded",

    Inactive: "bg-red-100 w-24 text-red-600",
  };

  return (
    <div
      className={`${baseClasses} flex  items-center gap-1 justify-center ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {icon}
      {status}
    </div>
  );
};

export default StatusBadge;
