import { FiSearch } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import React, { useEffect, useRef } from "react";
import { UpArrowFilter } from "../../assets/icons";

const SearchAndFilterComponent = ({
  searchQuery = "",
  onSearchChange = () => {},
  statusFilter = "all",
  onStatusChange = () => {},
  statusOptions = [],
}) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const filterRef = useRef(null);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterChange = (filterValue) => {
    onStatusChange(filterValue);
    setIsFilterOpen(false);
  };

  // ✅ Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filters = [
    "By default",
    "Active",
    "Inactive",
    "Active on top",
    "Inactive on top",
    "Archived clients",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-2 md:p-6 relative w-full h-auto gap-2 flex flex-wrap items-center md:justify-between">
      {/* Search Input */}
      <div className="relative">
        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or client code..."
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg max-lg:w-full w-[640px] h-[41px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Sort by Name */}
        <div className="relative">
          <button className="flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg  h-[41px] text-left">
            <span className="text-xs md:text-base">Sort by Name</span>
            <MdKeyboardArrowDown />
          </button>
        </div>

        {/* Sort Button */}
        <button className="p-2 border border-gray-200 rounded-lg w-[41px] h-[41px] flex items-center justify-center">
          <UpArrowFilter />
        </button>

        {/* Filters Dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={toggleFilter}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg w-[115px] h-[41px]"
          >
            <FaFilter className="text-gray-800" />
            <span className="text-xs md:text-sm">Filters</span>
            <MdKeyboardArrowDown
              className={`transition-transform duration-200 ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-2 w-[223px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-2">
                {statusOptions.map((option) => (
                  <li
                    key={option.value}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleFilterChange(option.value)}
                  >
                    <input
                      type="radio"
                      checked={statusFilter === option.value}
                      readOnly
                      className="mr-3 h-4 w-4 rounded border-gray-300 text-indigo-600 accent-dark"
                    />
                    <span>{option.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterComponent;
