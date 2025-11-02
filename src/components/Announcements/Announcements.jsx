import React from "react";
import CustomHeading from "../Common/CustomHeading";
import Icons from "../../assets/icons/Icons";

const Announcements = () => {
  const announcements = [
    {
      title: "Follow up with Sarah Johnson regarding subscription renewal",
      time: "2 hours ago",
      borderColor: "#1877F2",
      bgColor: "#F2F9FF",
    },
    {
      title: "Team meeting scheduled for tomorrow at 10 AM",
      time: "5 hours ago",
      borderColor: "#10B981",
      bgColor: "#ECFDF5",
    },
    {
      title: "New feature released: Dark Mode Support",
      time: "1 day ago",
      borderColor: "#F59E0B",
      bgColor: "#FFFBEB",
    },
  ];

  return (
    <>
      <CustomHeading heading="Announcements" textAlign="text-left" />

      <div className="bg-white p-2 lg:p-6 rounded-lg shadow-md mt-4">
        <div className="flex items-center justify-between mb-6 mt-3">
          <div className="flex items-center space-x-2">
            <Icons.Document color="#1877F2" size={24} />
            <CustomHeading heading="Announcements" />
          </div>
          <button className="text-xs md:text-sm text-[#081722] font-medium underline">
            View All
          </button>
        </div>

        {announcements?.map((item, index) => (
          <div
            key={index}
            className="rounded-lg p-3 lg:p-4 mb-4 border-l-4"
            style={{
              borderColor: item.borderColor,
              backgroundColor: item.bgColor,
            }}
          >
            <p className="text-[#081722] font-normal text-base font-poppins">
              {item?.title}
            </p>
            <p className="text-[#6B7280] font-normal font-poppins text-xs">
              {item?.time}
            </p>
          </div>
        ))}
        <button className="border border-black rounded-lg mt-3 flex items-center text-center justify-center w-full p-3 gap-3">
          <Icons.PlusIcon />
          Add New Announcement
        </button>
      </div>
    </>
  );
};

export default Announcements;
