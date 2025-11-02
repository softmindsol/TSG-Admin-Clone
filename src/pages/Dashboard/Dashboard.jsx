import React from "react";
import StatCard from "../../components/Common/StatsCard";
import {
  ActiveSubscriptionsIcon,
  Clients,
  OverdueIcon,
  PendingRequests,
} from "../../assets/icons";
import TotalAgentPerformance from "../../components/TotalAgentPerformance/TotalAgentPerformance";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import PaymentOverview from "../../components/PaymentOverview/PaymentOverview";
import Announcements from "../../components/Announcements/Announcements";
const ActiveClientsIcon = () => (
  <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
    <Clients className=" stroke-blue-500 text-blue-500" />
  </div>
);

const PendingRequestsIcon = () => (
  <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
    <PendingRequests className="" />
  </div>
);

const OverduePaymentsIcon = () => (
  <div className="w-16 h-16 flex items-center justify-center bg-[#F50408]/10 rounded-full">
    <OverdueIcon />
  </div>
);

const ActiveSubscription = () => (
  <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full">
    <ActiveSubscriptionsIcon />
  </div>
);

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        <StatCard
          icon={<ActiveClientsIcon />}
          title="Active Agents"
          value="7"
          change="16%"
          changeType="increase"
          footerText="this month"
        />
        <StatCard
          icon={<PendingRequestsIcon />}
          value="7"
          title="Pending Requests"
          button={true}
          buttonText="View Requests"
        />
        <StatCard
          icon={<OverduePaymentsIcon />}
          title="Overdue Payments"
          value="£8,450"
          button={true}
          buttonText="Send Reminders"
        />
        <StatCard
          icon={<ActiveSubscription />}
          title="Active Subscription"
          value="£8,450"
          change="16%"
          changeType="increase"
          footerText="this month"
        />
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        <div className="lg:col-span-3">
          <TotalAgentPerformance />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 mt-6">
        <div className="">
          <PaymentOverview />
        </div>
        <div className="">
          <Announcements />
        </div>
      </div>

    </>
  );
};

export default Dashboard;
