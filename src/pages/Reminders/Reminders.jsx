import { useState } from "react";
import SearchAndFilterComponent from "../../components/Common/SearchAndFilterComponent";
import ReusableTable from "../../components/Common/ReusabelTable";
import Icons from "../../assets/icons/Icons";
import SendRemainderModal from "../../components/ModalComponents/SendRemainderModal";

const Reminders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reminders, setReminder] = useState([
    {
      agent: { name: "Jennifer Martinez", email: "jennifer.m@email.com" },
      plan: "Shortlist",
      status: "Paid",
      amount: "£49.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "Robert Kim", email: "robert.k@email.com" },
      plan: "Standard",
      status: "Unpaid",
      amount: "£99.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "Maria Rodriguez", email: "maria.rod@email.com" },
      plan: "Demo",
      status: "Paid",
      amount: "£0.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "Amanda Foster", email: "amanda.f@email.com" },
      plan: "Shortlist",
      status: "Paid",
      amount: "£49.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "StartupX", email: "hello@startupx.com" },
      plan: "Demo",
      status: "Due Soon",
      amount: "£0.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "TechCorp Ltd", email: "contact@techcorp.com" },
      plan: "Demo",
      status: "Paid",
      amount: "£0.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "Maria Rodriguez", email: "maria.rod@email.com" },
      plan: "Shortlist",
      status: "Unpaid",
      amount: "£49.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "Sarah Wilson", email: "sarah.wil@email.com" },
      plan: "Standard",
      status: "Due Soon",
      amount: "£99.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
  ]);

  // Table columns for Pending Requests
  const reminderColumns = [
    {
      key: "agent",
      label: "AGENT",
      render: (agent) => (
        <div>
          <div className="font-medium text-gray-900">{agent.name}</div>
          <div className="text-gray-500">{agent.email}</div>
        </div>
      ),
    },
    {
      key: "plan",
      label: "PLAN",
      render: (plan) => (
        <span
          className={`px-3.5 inline-flex text-xs leading-5 rounded-full ${
            plan === "Shortlist"
              ? "bg-[#9333EA1A] text-[#9333EA]"
              : plan === "Standard"
              ? "bg-[#1877F21A] text-[#1877F2]"
              : "bg-[#6B72801A] text-[#6B7280]"
          }`}
        >
          {plan}
        </span>
      ),
    },
    {
      key: "status",
      label: "STATUS",
      render: (status) => (
        <span
          className={`px-3.5 inline-flex text-xs leading-5 rounded-full ${
            status === "Paid"
              ? "bg-[#00AC4F1A] text-[#00AC4F]"
              : status === "Unpaid"
              ? "bg-[#F504081A] text-[#F50408]"
              : "bg-[#F6B31D1A] text-[#F6B31D]"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: "amount",
      label: "AMOUNT",
      render: (company) => (
        <div className="text-xs md:text-sm font-semibold text-[#6B7280]">
          {company}
        </div>
      ),
    },
    {
      key: "lastPayment",
      label: "LAST PAYMENT",
      render: (company) => (
        <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
          <Icons.CalendarIcon />
          {company}
        </div>
      ),
    },
    {
      key: "nextDue",
      label: "NEXT DUE",
      render: (company) => (
        <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
          <Icons.CalendarIcon />
          {company}
        </div>
      ),
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: () => (
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="flex gap-2 items-center text-white bg-[#081722] p-2 rounded-[6px]"
        >
          <Icons.CalendarIcon />
          Send Reminder
        </button>
      ),
    },
  ];

  return (
    <>
      {/* Tabs */}
      <div className="mt-2 md:mt-7">
        <SearchAndFilterComponent />
      </div>

      <SendRemainderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Active Tab Table */}
      <div className="mt-6">
        <ReusableTable data={reminders} columns={reminderColumns} />
      </div>
    </>
  );
};

export default Reminders;
