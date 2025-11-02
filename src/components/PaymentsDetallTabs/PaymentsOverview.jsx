import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import ReusableTable from "../Common/ReusabelTable";
import SendRemainderModal from "../ModalComponents/SendRemainderModal";

const PaymentsOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentOverview, setPaymentOverview] = useState([
    {
      agent: { name: "Jennifer Martinez", email: "jennifer.m@email.com" },
      plan: "Team",
      status: "Paid",
      amount: "£99.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "Robert Kim", email: "robert.k@email.com" },
      plan: "Standard",
      status: "Unpaid",
      amount: "£199.00",
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
      plan: "Team",
      status: "Paid",
      amount: "£99.00",
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
      plan: "Team",
      status: "Unpaid",
      amount: "£99.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
    {
      agent: { name: "Sarah Wilson", email: "sarah.wil@email.com" },
      plan: "Standard",
      status: "Due Soon",
      amount: "£199.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
    },
  ]);

  // Table columns for Payment Overview
  const paymentOverviewColumns = [
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
            plan === "Team"
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
      render: (amount) => (
        <div className="text-xs md:text-sm font-semibold text-[#6B7280]">
          {amount}
        </div>
      ),
    },
    {
      key: "lastPayment",
      label: "LAST PAYMENT",
      render: (lastPayment) => (
        <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
          <Icons.CalendarIcon />
          {lastPayment}
        </div>
      ),
    },
    {
      key: "nextDue",
      label: "NEXT DUE",
      render: (nextDue) => (
        <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
          <Icons.CalendarIcon />
          {nextDue}
        </div>
      ),
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: () => (
        <div className="flex items-center gap-4">
          <button
            className="text-gray-500 "
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <Icons.OutlinedEyeIcon />
          </button>
          <button className="text-gray-500">
            <Icons.EnvelopeIcon />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <SendRemainderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ReusableTable data={paymentOverview} columns={paymentOverviewColumns} />
    </div>
  );
};

export default PaymentsOverview;
