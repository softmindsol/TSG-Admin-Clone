import { useState } from "react";
import SearchAndFilterComponent from "../../components/Common/SearchAndFilterComponent";
import ReusableTable from "../../components/Common/ReusabelTable";
import Icons from "../../assets/icons/Icons";
import SendRemainderModal from "../../components/ModalComponents/SendRemainderModal";
import PaymentsOverview from "../../components/PaymentsDetallTabs/PaymentsOverview";
import PaymentHistory from "../../components/PaymentsDetallTabs/PaymentHistory";
import IndividualSubscriptions from "../../components/PaymentsDetallTabs/IndividualSubscriptions";
import SubscriptionManagement from "../../components/PaymentsDetallTabs/SubscriptionManagement";

const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Payment Overview");

  const renderTab = () => {
    switch (activeTab) {
      case "Payment Overview":
        return <PaymentsOverview />;
      case "Payment History":
        return <PaymentHistory />;
      case "Individual Subscriptions":
        return <IndividualSubscriptions />;
      case "Subscription Management":
        return <SubscriptionManagement />;

      default:
        return null;
    }
  };

  const tabs = [
    { name: "Payment Overview", icon: <Icons.UserIcon size={18} /> },
    { name: "Payment History", icon: <Icons.PaymentIcon size={18} /> },
    { name: "Individual Subscriptions", icon: <Icons.Document size={18} /> },
    { name: "Subscription Management", icon: <Icons.PollIcon size={18} /> },
  ];

  return (
    <>
      {/* Tabs */}
      <div className="mt-2 md:mt-7">
        <SearchAndFilterComponent />
      </div>

      <div className="flex flex-col md:flex-row gap-2 md::gap-4 my-3 lg:my-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-8 flex items-center gap-2 font-poppins py-2 font-medium cursor-pointer text-sm lg:text-base rounded-lg transition-all duration-200
              ${
                activeTab === tab.name
                  ? "bg-[#081722] text-white"
                  : "bg-[#E5E7EB80] text-gray-600 hover:bg-gray-200"
              }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      <div className="">{renderTab()}</div>

      {/* <SendRemainderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      
      <div className="mt-6">
        <ReusableTable data={reminders} columns={reminderColumns} />
      </div> */}
    </>
  );
};

export default Payments;
