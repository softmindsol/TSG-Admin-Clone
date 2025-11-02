import React from "react";

const SkeletonTable = ({ rows = 6 }) => {
  return (
    <div className="w-full">
      <div className="animate-pulse space-y-2">
        {/* header skeleton */}
        <div className="h-10 bg-gray-200 rounded-md mb-3"></div>

        {/* rows skeleton */}
        {[...Array(rows)].map((_, index) => (
          <div key={index} className="h-12 bg-gray-100 rounded-md"></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;
