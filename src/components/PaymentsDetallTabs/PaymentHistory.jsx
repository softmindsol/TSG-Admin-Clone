import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import ReusableTable from "../Common/ReusabelTable";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([
    {
      date: "27/02/2025",
      agent: "Jennifer Martinez",
      paymentMethod: "Credit Card **** 4242",
      amount: "£199.00",
      status: "Success",
    },
    {
      date: "27/02/2025",
      agent: "Robert Kim",
      paymentMethod: "Credit Card **** 9012",
      amount: "£99.00",
      status: "Failed",
    },
    {
      date: "27/02/2025",
      agent: "Maria Rodriguez",
      paymentMethod: "Stripe **** 5678",
      amount: "£99.00",
      status: "Success",
    },
    {
      date: "27/02/2025",
      agent: "Amanda Foster",
      paymentMethod: "Credit Card **** 4242",
      amount: "£199.00",
      status: "Success",
    },
    {
      date: "27/02/2025",
      agent: "StartupX",
      paymentMethod: "Credit Card **** 9012",
      amount: "£199.00",
      status: "Refunded",
    },
    {
      date: "27/02/2025",
      agent: "TechCorp Ltd",
      paymentMethod: "Stripe **** 5678",
      amount: "£199.00",
      status: "Success",
    },
    {
      date: "27/02/2025",
      agent: "Maria Rodriguez",
      paymentMethod: "Credit Card **** 9012",
      amount: "£99.00",
      status: "Failed",
    },
    {
      date: "27/02/2025",
      agent: "Sarah Wilson",
      paymentMethod: "Stripe **** 5678",
      amount: "£99.00",
      status: "Refunded",
    },
  ]);

  // Table columns for Payment History
  const paymentHistoryColumns = [
    {
      key: "date",
      label: "DATE",
      render: (date) => (
        <div className="text-xs md:text-sm flex items-center gap-1 text-[#6B7280]">
          <Icons.CalendarIcon />
          {date}
        </div>
      ),
    },
    {
      key: "agent",
      label: "AGENT",
      render: (agent) => (
        <div>
          <div className="font-medium text-xs md:text-sm  text-gray-900">
            {agent}
          </div>
        </div>
      ),
    },
    {
      key: "paymentMethod",
      label: "PAYMENT METHOD",
      render: (paymentMethod) => (
        <div className="text-xs md:text-sm text-[#6B7280]">{paymentMethod}</div>
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
      key: "status",
      label: "STATUS",
      render: (status) => (
        <span
          className={`px-3.5 inline-flex text-xs leading-5 rounded-full ${
            status === "Success"
              ? "bg-[#00AC4F1A] text-[#00AC4F]"
              : status === "Failed"
              ? "bg-[#F504081A] text-[#F50408]"
              : "bg-[#6B72801A] text-[#6B7280]"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: "invoice",
      label: "INVOICE",
      render: (status) => (
        <button
          className={`flex gap-2 items-center p-2 rounded-[6px] ${
            status === "Failed"
              ? "text-gray-400 bg-gray-100"
              : "text-white bg-[#081722]"
          }`}
          disabled={status === "Failed"}
        >
          <Icons.DownloadIcon />
          Download
        </button>
      ),
    },
  ];
  return (
    <div>
      <ReusableTable data={paymentHistory} columns={paymentHistoryColumns} />
    </div>
  );
};

export default PaymentHistory;
