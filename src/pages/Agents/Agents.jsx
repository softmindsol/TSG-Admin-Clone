import React, { useState } from "react";
import { useAgents } from "../../hooks/useAgents";
import Icons from "../../assets/icons/Icons";
import StatusBadge from "../../components/Common/StatusBadge";
import { CircleLock } from "../../assets/icons";
import AddNewAgent from "../../components/ModalComponents/AddNewAgent";
import AgentDetail from "./AgentDetail";
import SearchAndFilterComponent from "../../components/Common/SearchAndFilterComponent";
import SkeletonTable from "../../components/Common/SkeletonTable";
import ErrorBoundary from "../../utils/error-boundary/ErrorBoundary";
import ErrorFallback from "../../utils/error-boundary/ErrorFallaback";

const Agents = () => {
  const { agents, isLoading, isError, refreshAgents } = useAgents();
  console.log("🚀 ~ Agents ~ agents:", agents);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const tableColumns = [
    {
      key: "agent",
      label: "Agent",
      render: (agent) => (
        <div>
          <div className="text-xs md:text-sm font-medium text-gray-900">
            {agent.name}
          </div>
          <div className="text-xs md:text-sm text-gray-500">{agent.email}</div>
        </div>
      ),
    },
    { key: "clientCode", label: "Agent Code" },
    {
      key: "contact",
      label: "Contact & Location",
      render: (contact) => (
        <div>
          <div className="text-xs md:text-sm flex items-center gap-1 font-medium text-gray-600">
            <Icons.PhoneIcon />
            {contact.phone}
          </div>
          <div className="text-xs md:text-sm flex items-center gap-1 text-gray-500">
            <Icons.LocationIcon />
            {contact.location}
          </div>
        </div>
      ),
    },
    {
      key: "subscription",
      label: "Subscription",
      render: (subscription) => <StatusBadge status={subscription} />,
    },
    {
      key: "dateAdded",
      label: "Next Payment",
      render: (date) => (
        <div className="flex items-center text-xs md:text-sm text-gray-500">
          <Icons.CameraIcons className="mr-2" />
          {date}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (status) => <StatusBadge status={status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-4">
          <Icons.EyeIcon
            className="cursor-pointer"
            onClick={() => setSelectedAgent(row.fullAgent)}
            size={19}
          />
          <Icons.Envelope size={19} />
          <CircleLock />
          <Icons.Notepad size={19} />
        </div>
      ),
    },
  ];

  const tableData =
    agents?.map((agent) => ({
      agent: {
        name: `${agent.firstName || ""} ${agent.lastName || ""}`,
        email: agent.email || "-",
      },
      clientCode: agent._id?.slice(-6)?.toUpperCase() || "N/A",
      contact: {
        phone: agent.phoneNumber || "N/A",
        location: agent.operatingArea || "N/A",
      },
      subscription:
        agent.subscriptionStatus === "active"
          ? "Paid"
          : agent.subscriptionStatus === "due"
          ? "DueSoon"
          : "Unpaid",
      dateAdded: agent.billingPeriodEnd
        ? new Date(agent.billingPeriodEnd).toLocaleDateString("en-GB")
        : "-",
      status: agent.status === "approved" ? "Active" : "Inactive",
      fullAgent: agent,
    })) || [];

  return (
    <>
      {selectedAgent ? (
        <AgentDetail
          agent={selectedAgent}
          onBack={() => setSelectedAgent(null)}
        />
      ) : (
        <>
          <div className="flex justify-end my-1 md:my-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-primary text-white font-semibold text-xs sm:text-sm md:text-base rounded-md hover:bg-gray-700 font-poppins"
            >
              + Add New Agent
            </button>
          </div>

          <AddNewAgent
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          <div className="mt-3 md:mt-7">
            <SearchAndFilterComponent />

            <div className="mt-3 md:mt-6">
              <ErrorBoundary fallback={ErrorFallback}>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {tableColumns.map((col) => (
                          <th
                            key={col.key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {isLoading ? (
                      <SkeletonTable rows={6} columns={tableColumns.length} />
                    ) : (
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.map((row, i) => (
                          <tr key={i}>
                            {tableColumns.map((col) => (
                              <td key={col.key} className="px-6 py-4">
                                {col.render
                                  ? col.render(row[col.key], row)
                                  : row[col.key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </ErrorBoundary>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Agents;
