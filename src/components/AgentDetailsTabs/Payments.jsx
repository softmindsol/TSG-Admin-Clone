import React from "react";
import { useAgentPaymentInfo } from "../../hooks/useAgents";
import CustomHeading from "../../components/Common/CustomHeading";
import Icons from "../../assets/icons/Icons";
import ReusableTable from "../Common/ReusabelTable";
import StatusBadge from "../Common/StatusBadge";

const Payments = ({ agentId }) => {
  const { paymentInfo, isLoading, isError } = useAgentPaymentInfo(agentId);

  const formatCurrency = (amount) => `£${amount?.toFixed(2) || "0.00"}`;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const cardInfo = paymentInfo
    ? [
        {
          icon: <Icons.PaymentIcon size={22} color="#1877F2" />,
          title: "Next Payment",
          description: paymentInfo.nextPaymentDate
            ? formatDate(paymentInfo.nextPaymentDate)
            : "No upcoming payment",
          info: paymentInfo.nextPaymentDate
            ? `${formatCurrency(paymentInfo.monthlyRate)} due`
            : "N/A",
          bgColor: "#1877F2",
        },
        {
          icon: <Icons.CircleCheck size={22} className="text-primaryGreen" />,
          title: "Status",
          description:
            paymentInfo.subscriptionStatus === "active" ? "Active" : "Inactive",
          info:
            paymentInfo.subscriptionStatus === "active"
              ? "Subscription active"
              : "Subscription inactive",
          bgColor: "#00AC4F",
        },
        {
          icon: <Icons.DollarIcon size={22} className="text-[#9333EA]" />,
          title: "Total Paid",
          description: formatCurrency(paymentInfo.totalPaid),
          info: `${paymentInfo.paymentHistory?.length || 0} payments`,
          bgColor: "#9333EA",
        },
        {
          icon: <Icons.CalendarIcon size={22} className="text-[#4B5563]" />,
          title: "Monthly Rate",
          description: formatCurrency(paymentInfo.monthlyRate),
          info: "Standard plan",
          bgColor: "#6B7280",
        },
      ]
    : [];

  const tableColumns = [
    {
      key: "date",
      label: "Date",
      render: (date) => formatDate(date),
    },
    {
      key: "amount",
      label: "Amount",
      render: (amount) => formatCurrency(amount),
    },
    {
      key: "method",
      label: "Method",
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <StatusBadge status={status === "paid" ? "Paid" : status} />
      ),
    },
    {
      key: "invoiceId",
      label: "Invoice",
    },
    {
      key: "action",
      label: "Actions",
      render: () => (
        <div>
          <button className="text-[#1877F2] font-poppins font-medium text-xs md:text-sm">
            Download
          </button>
        </div>
      ),
    },
  ];

  const tableData = paymentInfo?.paymentHistory || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading payment information...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        Error loading payment information
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {cardInfo?.map((item, index) => (
          <div
            key={index}
            className="bg-white font-poppins rounded-lg border p-6"
          >
            <div className="flex  items-center gap-2 mb-3">
              <div
                style={{
                  backgroundColor: `${item.bgColor}1A`, // 1A = 10% opacity in hex
                }}
                className={` p-2 rounded-md`}
              >
                {item.icon}
              </div>
              <p className="text-primary font-medium text-base">{item.title}</p>
            </div>
            <CustomHeading
              heading={item.description}
              textAlign="text-left"
              fontSize="text-[20px]"
              fontWeight="font-semibold"
            />
            <p className="text-xs md:text-sm text-paragraphText font-normal">
              {item.info}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white border py-4 rounded-lg">
        <div className="flex items-center justify-between mb-4 px-4">
          <CustomHeading heading="Payment History" />
          <button className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-gray-700 font-poppins">
            Export
          </button>
        </div>
        <ReusableTable data={tableData} columns={tableColumns} />
      </div>
    </>
  );
};

export default Payments;
