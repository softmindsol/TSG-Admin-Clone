import React from "react";

const ReusableTable = ({ data = [], columns = [], isLoading = false }) => {
  // 🔹 Skeleton rows render karne ke liye function
  const renderSkeletonRows = () =>
    Array.from({ length: 5 }).map((_, rowIndex) => (
      <tr key={rowIndex} className="animate-pulse">
        {columns.map((col) => (
          <td key={col.key} className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </td>
        ))}
      </tr>
    ));

  // 🔹 No data message
  const renderEmptyState = () => (
    <tr>
      <td
        colSpan={columns.length}
        className="text-center py-10 text-gray-500 text-sm font-poppins"
      >
        {isLoading ? "Loading data..." : "No data found"}
      </td>
    </tr>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl w-full h-auto">
      {/* ✅ Scroll container */}
      <div className="relative">
        <div className="max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="w-max min-w-full border-collapse font-poppins">
            {/* ✅ Table Header */}
            <thead className="bg-gray-50">
              <tr>
                {columns?.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-semibold text-[#081722] uppercase tracking-wider whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* ✅ Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading
                ? renderSkeletonRows()
                : data && data.length > 0
                ? data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="px-6 py-4 text-xs md:text-sm text-gray-700 whitespace-nowrap"
                        >
                          {col.render
                            ? col.render(row[col.key], row)
                            : row[col.key] ?? "-"}
                        </td>
                      ))}
                    </tr>
                  ))
                : renderEmptyState()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
