import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import ReusableTable from "../Common/ReusabelTable";

const IndividualSubscriptions = () => {
  const [individualSubscription, setIndividualSubscription] = useState([
    {
      agent: { name: "Jennifer Martinez", email: "jennifer.m@email.com" },
      plan: "Shortlist",
      status: "Paid",
      amount: "£99.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
      manage: true,
    },
    {
      agent: { name: "Robert Kim", email: "robert.k@email.com" },
      plan: "Standard",
      status: "Unpaid",
      amount: "£199.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
      manage: false,
    },
    {
      agent: { name: "Maria Rodriguez", email: "maria.rod@email.com" },
      plan: "Demo",
      status: "Paid",
      amount: "£0.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
      manage: true,
    },
    {
      agent: { name: "Amanda Foster", email: "amanda.f@email.com" },
      plan: "Shortlist",
      status: "Paid",
      amount: "£99.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
      manage: true,
    },
    {
      agent: { name: "StartupX", email: "hello@startupx.com" },
      plan: "Demo",
      status: "Due Soon",
      amount: "£0.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
      manage: true,
    },
    {
      agent: { name: "TechCorp Ltd", email: "contact@techcorp.com" },
      plan: "Demo",
      status: "Paid",
      amount: "£0.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
      manage: true,
    },
    {
      agent: { name: "Maria Rodriguez", email: "maria.rod@email.com" },
      plan: "Shortlist",
      status: "Unpaid",
      amount: "£99.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
      manage: false,
    },
    {
      agent: { name: "Sarah Wilson", email: "sarah.wil@email.com" },
      plan: "Standard",
      status: "Due Soon",
      amount: "£199.00",
      lastPayment: "27/01/2025",
      nextDue: "27/02/2025",
      manage: true,
    },
  ]);

  const handleToggle = (indexToToggle) => {
    // Create a new copy of the array to avoid direct state mutation
    const updatedSubscriptions = [...individualSubscription];

    // Invert the 'manage' boolean value for the specific item
    updatedSubscriptions[indexToToggle] = {
      ...updatedSubscriptions[indexToToogle],
      manage: !updatedSubscriptions[indexToToggle].manage,
    };

    // Update the state with the new array
    setIndividualSubscription(updatedSubscriptions);
  };

  // Table columns for Individual Subscription
  const individualSubscriptionColumns = [
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
      render: (amount) => (
        <div className="text-xs md:text-sm font-semibold text-gray-900">
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
      key: "manage",
      label: "MANAGE",
      render: (manage, item, index) => (
        <label className="inline-flex items-center mb-5 cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div
            className="relative w-9 h-5 
    bg-[#F50408] rounded-full peer 
    after:content-[''] after:absolute after:top-[2px] after:start-[2px]
    after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all
    peer-checked:bg-[#00AC1B]
    peer-checked:after:translate-x-full
    rtl:peer-checked:after:-translate-x-full
    transition-colors duration-300 ease-in-out"
          ></div>
        </label>
      ),
    },
  ];
  return (
    <div>
      <ReusableTable
        data={individualSubscription}
        columns={individualSubscriptionColumns}
      />
    </div>
  );
};

export default IndividualSubscriptions;
