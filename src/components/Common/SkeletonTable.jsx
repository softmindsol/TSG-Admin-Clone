import React from "react";

const SkeletonTable = ({ rows = 6, columns = 1 }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default SkeletonTable;
