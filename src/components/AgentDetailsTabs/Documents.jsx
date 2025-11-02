import React from "react";
import CustomHeading from "../Common/CustomHeading";
import GlobalButton from "../Common/GlobalButton";
import Icons from "../../assets/icons/Icons";
import FileUpload from "../Common/FileUpload";

const Documents = () => {
  const documents = [
    {
      id: 1,
      name: "Passport_Copy.pdf",
      date: "08/08/2025, 10:45 AM",
      author: "John Agent",
      status: "Approved",
      statusColor: "bg-[#00AC4F]",
    },
    {
      id: 2,
      name: "Utility_Bill_Jan2025.pdf",
      date: "06/08/2025, 09:15 AM",
      author: "Sarah Wilson",
      status: "Pending",
      statusColor: "bg-orange-500",
    },
  ];
  return (
    <section>
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <CustomHeading heading="Documents" />
          <GlobalButton icon={Icons.Upload}>Upload Documents</GlobalButton>
        </div>
        <FileUpload />
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center my-6 justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Left section with icon and document info */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 bg-[#DBEAFE] p-2 rounded-md">
                <Icons.Document size={22} className=" text-[#2563EB]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-[#081722] truncate">
                  {doc.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {doc.date} • by {doc.author}
                </p>
              </div>
            </div>

            {/* Right section with status and actions */}
            <div className="flex items-center space-x-3">
              {/* Status badge */}

              {/* Action buttons */}
              <div className="flex items-center text-primary space-x-3">
                <button className="p-1.5  hover:text-gray-600 transition-colors">
                  <Icons.EyeIcon />
                </button>
                <button className="p-1.5  hover:text-gray-600 transition-colors">
                  <Icons.Download size={20} />
                </button>
                <button className="p-1.5   transition-colors">
                  <Icons.DeleteIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Documents;
