import React, { useState } from "react";
import CustomHeading from "../Common/CustomHeading";
import AddNewNoteModal from "../ModalComponents/AddNewNoteModal";

const Notes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const announcements = [
    {
      title: "Top performer in Q4 2023 - exceeded targets by 150%",
      time: "By Support Team   05/01/2024",
      borderColor: "#1877F2",
      bgColor: "#F2F9FF",
    },
    {
      title: "Requested additional marketing materials for luxury listings",
      time: "By Support Team   05/01/2024",

      borderColor: "#10B981",
      bgColor: "#ECFDF5",
    },
    {
      title: "Client feedback consistently excellent - 4.9/5 average rating",
      time: "By Support Team   05/01/2024",

      borderColor: "#F59E0B",
      bgColor: "#FFFBEB",
    },
    {
      title: "Client feedback consistently excellent - 4.9/5 average rating",
      time: "By Support Team   05/01/2024",

      borderColor: "#F50408",
      bgColor: "#FFF1F1",
    },
  ];
  return (
    <>
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <CustomHeading heading="Internal Notes" fontSize="text-xl" />
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-gray-700 font-poppins"
          >
            Add Note
          </button>
          <AddNewNoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
        {announcements?.map((item, index) => (
          <div
            key={index}
            className="rounded-lg p-4 mb-4 border-l-4"
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
      </div>
    </>
  );
};

export default Notes;
