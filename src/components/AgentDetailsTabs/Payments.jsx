import React from "react";
import CustomHeading from "../../components/Common/CustomHeading";
import Icons from "../../assets/icons/Icons";
import ReusableTable from "../Common/ReusabelTable";
import StatusBadge from "../Common/StatusBadge";
const Payments = () => {
  const cardInfo = [
    {
      icon: <Icons.PaymentIcon size={22} color="#1877F2" />,
      title: "Next Payment",
      description: "2024-02-15",
      info: "£99.00 due",
      bgColor: "#1877F2",
    },
    {
      icon: <Icons.CircleCheck size={22} className="text-primaryGreen" />,
      title: "Status",
      description: "Paid",
      info: "Subscription active",
      bgColor: "#00AC4F",
    },
    {
      icon: <Icons.DollarIcon size={22} className="text-[#9333EA]" />,
      title: "Total Paid",
      description: "£1,188",
      info: "12 payments",
      bgColor: "#9333EA",
    },
    {
      icon: <Icons.CalendarIcon size={22} className="text-[#4B5563]" />,
      title: "Monthly Rate",
      description: "£1,188",
      info: "Standard plan",
      bgColor: "#6B7280",
    },
  ];
  const tableColumns = [
    { key: "date", label: "Date" },

    { key: "amount", label: "Amount" },

    {
      key: "method",
      label: "Method",
    },

    {
      key: "status",
      label: "Status",
      render: (status) => <StatusBadge status={status} />,
    },

    {
      key: "invoice",
      label: "Invoice",
    },
    {
      key: "action",
      label: "Actions",
      render: (action) => (
        <div>
          <button className="text-[#1877F2] font-poppins font-medium text-xs md:text-sm">
            Download
          </button>
        </div>
      ),
    },
  ];

  const tableData = [
    {
      amount: "£99.00",
      date: "27/01/2025",
      method: "Credit Card",
      invoice: "INV-2024-001",
      status: "Paid",
    },
    {
      amount: "£99.00",
      date: "27/01/2025",
      method: "Credit Card",
      invoice: "INV-2024-001",
      status: "Paid",
    },
    {
      amount: "£99.00",
      date: "27/01/2025",
      method: "Credit Card",
      invoice: "INV-2024-001",
      status: "Paid",
    },
    {
      amount: "£99.00",
      date: "27/01/2025",
      method: "Credit Card",
      invoice: "INV-2024-001",
      status: "Paid",
    },
    {
      amount: "£99.00",
      date: "27/01/2025",
      method: "Credit Card",
      invoice: "INV-2024-001",
      status: "Paid",
    },
    {
      amount: "£99.00",
      date: "27/01/2025",
      method: "Credit Card",
      invoice: "INV-2024-001",
      status: "Paid",
    },
  ];

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
