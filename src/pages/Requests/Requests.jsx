import { useState } from "react";
import SearchAndFilterComponent from "../../components/Common/SearchAndFilterComponent";
import ReusableTable from "../../components/Common/ReusabelTable";
import Icons from "../../assets/icons/Icons";
import RequestApprovalModal from "../../components/ModalComponents/RequestApprovalModal";

import { useRequests } from "../../hooks/useRequest";
import SkeletonTable from "../../components/Common/SkeletonTable";

const Requests = () => {
  const { requests, isLoading, approveAgent, rejectAgent } = useRequests();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [activeTab, setActiveTab] = useState("pending"); // "pending" | "processed"

  // ✅ Format pending requests (based on API response)
  const pendingRequests = requests
    ?.filter((r) => r.status === "pending")
    ?.map((r) => ({
      id: r._id,
      name: `${r.firstName} ${r.lastName}`,
      email: r.email,
      phone: r.phoneNumber,
      location: r.operatingArea,
      company: r.companyName,
      type: r.agentType,
      submitted: new Date(r.createdAt).toLocaleDateString("en-GB"),
      raw: r,
    }));

  const processedRequests = requests
    ?.filter((r) => r.status !== "pending")
    ?.map((r) => ({
      id: r._id,
      name: `${r.firstName} ${r.lastName}`,
      email: r.email,
      phone: r.phoneNumber,
      location: r.operatingArea,
      company: r.companyName,
      type: r.agentType,
      submitted: new Date(r.createdAt).toLocaleDateString("en-GB"),
      raw: r,
    }));

  // ✅ Columns
  const columns = [
    {
      key: "name",
      label: "Agent",
      render: (_, row) => (
        <div>
          <div className="text-xs md:text-sm font-medium text-primary">
            {row.name}
          </div>
          <div className="text-xs md:text-sm text-[#6B7280]">{row.email}</div>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Contact & Location",
      render: (_, row) => (
        <div>
          <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
            <Icons.PhoneIcon /> {row.phone}
          </div>
          <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
            <Icons.LocationIcon /> {row.location}
          </div>
        </div>
      ),
    },
    {
      key: "company",
      label: "Company & Type",
      render: (_, row) => (
        <div>
          <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
            <Icons.BuildingIcon /> {row.company}
          </div>
          <div className="text-xs md:text-sm flex items-center gap-1 text-[#2563EB]">
            <Icons.UserIcon /> {row.type}
          </div>
        </div>
      ),
    },
    {
      key: "submitted",
      label: "Submitted",
      render: (value) => (
        <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
          <Icons.CalendarIcon /> {value}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-4">
          <Icons.EyeIcon
            className="cursor-pointer text-[#1877F2]"
            onClick={() => {
              setSelectedAgent(row.raw);
              setIsModalOpen(true);
            }}
            size={19}
          />
          <Icons.CircleCheck
            className="text-[#00AC4F] cursor-pointer"
            onClick={() => approveAgent(row.id)}
            size={19}
          />
          <Icons.CrossCricleIcon
            className="text-[#F50408] cursor-pointer"
            onClick={() => rejectAgent(row.id)}
            size={19}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {/* 🔍 Search */}
      <div className="mt-2 md:mt-7">
        <SearchAndFilterComponent />
      </div>

      {/* 🧭 Tabs */}
      <div className="flex flex-col md:flex-row items-center gap-4 my-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-8 flex items-center gap-2 font-poppins py-2 font-medium cursor-pointer text-sm md:text-base rounded-lg transition-all duration-200 ${
            activeTab === "pending"
              ? "bg-[#081722] text-white"
              : "bg-[#E5E7EB80] text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Icons.PendingUserIcon /> Pending Requests ({pendingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab("processed")}
          className={`px-8 flex items-center gap-2 font-poppins py-2 font-medium cursor-pointer text-sm md:text-base rounded-lg transition-all duration-200 ${
            activeTab === "processed"
              ? "bg-[#081722] text-white"
              : "bg-[#E5E7EB80] text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Icons.UserTickIcon /> Processed Requests ({processedRequests.length})
        </button>
      </div>

      {/* 🪄 Modal */}
      <RequestApprovalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedAgent={selectedAgent}
        onDecision={(decision) => {
          if (decision === "Approved") approveAgent(selectedAgent._id);
          else rejectAgent(selectedAgent._id);
          setIsModalOpen(false);
        }}
      />

      {/* 📋 Table / Skeleton */}
      <div className="mt-6">
        {isLoading ? (
          <SkeletonTable rows={6} />
        ) : activeTab === "pending" ? (
          <ReusableTable data={pendingRequests} columns={columns} />
        ) : (
          <ReusableTable data={processedRequests} columns={columns} />
        )}
      </div>
    </>
  );
};

export default Requests;
