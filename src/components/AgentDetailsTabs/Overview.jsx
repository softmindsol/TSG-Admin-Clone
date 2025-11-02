import React, { useState } from "react";
import CustomHeading from "../Common/CustomHeading";
import Icons from "../../assets/icons/Icons";
import SendRemainderModal from "../ModalComponents/SendRemainderModal";

const Overview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(
    "Experienced real estate agent with 8+ years in the NYC market. Specializing in luxury residential properties and commercial real estate. Top performer with excellent client satisfaction ratings and a proven track record of closing high-value deals."
  );

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white border rounded-lg p-4 font-poppins ">
        <div className="flex items-center justify-between">
          <CustomHeading heading="Bio & Information" />
          <button
            onClick={toggleEdit}
            className={`flex font-medium items-center gap-1 ${
              isEditing ? "text-primaryGreen" : "text-[#1877F2]"
            } `}
          >
            {isEditing ? (
              <Icons.CircleCheck size={20} />
            ) : (
              <Icons.Edit size={20} />
            )}

            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <textarea
          className={`w-full text-paragraphText mt-2 rounded-md  py-2 transition 
        ${isEditing ? "border border-gray-400" : "border-none bg-transparent"}`}
          rows={6}
          disabled={!isEditing}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>
      <div className="bg-white border rounded-lg p-4 font-poppins my-5">
        <CustomHeading heading="Account Information" textAlign="text-left" />
        <div className="grid grid-cols-2 mt-3">
          <div className="font-medium text-primary">
            <p>Join Date</p>
            <div className="flex text-paragraphText items-center gap-2">
              <Icons.CalendarIcon />
              <p className=" text-base font-normal ">2023-01-15</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-primary font-medium">Next Payment Due</p>

            <div className="flex text-paragraphText items-center gap-2">
              <Icons.CalendarIcon />
              <p className=" text-base font-normal ">2023-01-15</p>
            </div>
          </div>
          <div className="">
            <p className="text-primary font-medium">Last Payment</p>
            <div className="flex text-paragraphText items-center gap-2">
              <Icons.CalendarIcon />
              <p className=" text-base font-normal ">2023-01-15</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-primary font-medium">Total Paid</p>

            <div className="flex text-paragraphText items-center gap-2">
              <Icons.CalendarIcon />
              <p className=" text-base font-normal ">2023-01-15</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4 font-poppins my-5">
        <CustomHeading heading="Quick Actions" textAlign="text-left" />
        <div className="flex items-center gap-3 mt-4">
          <button className="text-[#EA580C] flex items-center gap-2 text-base border rounded-md px-10 py-3 font-medium font-poppins">
            <Icons.ResetIcon size={22} />
            Reset Login
          </button>
          <button onClick={()=> setIsModalOpen(!isModalOpen)} className="text-primaryGreen flex items-center gap-2 text-base border rounded-md px-10 py-3 font-medium font-poppins">
            <Icons.SendIcon size={22} />
            Send Reminder
          </button>
          <button className="text-paragraphText flex items-center gap-2 text-base border rounded-md px-10 py-3 font-medium font-poppins">
            <Icons.Document />
            Add Note
          </button>
        </div>
      </div>
      <SendRemainderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Overview;
