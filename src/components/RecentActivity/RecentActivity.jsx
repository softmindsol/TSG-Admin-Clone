import React from "react";
import CustomHeading from "../Common/CustomHeading";
import AnnouncementItem from "./AnnouncementsItem";
import Icons from "../../assets/icons/Icons";
import { PendingRequests } from "../../assets/icons";

const RecentActivity = () => {
  const announcements = [
    {
      id: 1,
      iconBg: "bg-[#00AC4F1A]",
      icon: <Icons.CircleCheck color="#00AC4F" size={26} />,
      title: "New CRM Integration",
      description: "2 minutes ago",
    },
    {
      id: 2,
      iconBg: "bg-[#F50408]/10",
      icon: <Icons.ErrorOutline color="#F50408" size={26} />,
      title: "Sales Training Webinar",
      description: "15 minutes ago",
    },
    {
      id: 3,
      iconBg: "bg-[#00AC4F]/10",
         icon:  <PendingRequests className="" />,
      title: "New request from Sarah Ahmed",
      description: "1 hour ago",
    },
    {
      id: 4,
      iconBg: "bg-gray-200",
         icon: <Icons.Clock  size={26} />,
      title: "Monthly payment reminders sent",
      description: "1 hour ago",
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center ">
        <CustomHeading heading="Recent Activity" />
      </div>
      <div className="space-y-6 mt-5  overflow-y-auto max-h-[564px]">
        {announcements.map((item) => (
          <AnnouncementItem
            key={item.id}
            icon={item.icon}
            iconBg={item.iconBg}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </>
  );
};

export default RecentActivity;
