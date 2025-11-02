import React from "react";
import CustomHeading from "../Common/CustomHeading";
import Icons from "../../assets/icons/Icons";
import TotalAgentPerformance from "../TotalAgentPerformance/TotalAgentPerformance";

const Performance = () => {
  const cardInfo = [
    {
      icon: <Icons.PaymentIcon size={22} color="#1877F2" />,
      title: "Client Satisfaction",
      description: "4.8/5",
      info: "+0.2",
      Trendicons: <Icons.TrendUp />,
    },
    {
      icon: <Icons.CircleCheck size={22} className="text-primaryGreen" />,
      title: "Deals Closed This Month",
      description: "47",
      info: "+0.2",
      bgColor: "#00AC4F",
    },
    {
      icon: <Icons.DollarIcon size={22} className="text-[#9333EA]" />,
      title: "Revenue Generated This Month",
      description: "£2.4M",
      info: "+0.2",
      bgColor: "#9333EA",
    },
    {
      icon: <Icons.CalendarIcon size={22} className="text-[#4B5563]" />,
      title: "Last Logged In",
      description: "2.3 hrs ago",
      info: "+0.2",
      bgColor: "#6B7280",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {cardInfo?.map((item, index) => (
          <div
            key={index}
            className="bg-white font-poppins rounded-lg border p-6"
          >
            <div className="flex  items-center gap-2 mb-2">
              <p className="text-primary font-medium text-base">{item.title}</p>
            </div>
            <CustomHeading
              heading={item.description}
              textAlign="text-left"
              fontSize="text-[20px]"
              fontWeight="font-semibold"
            />
            <div className="flex items-center mt-2 text-primaryGreen gap-1">
              {item.Trendicons}
              <p className="text-xs md:text-sm font-normal">{item.info}</p>
            </div>
          </div>
        ))}
      </div>
      <TotalAgentPerformance />
    </>
  );
};

export default Performance;
