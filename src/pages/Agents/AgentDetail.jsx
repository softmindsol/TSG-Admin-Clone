import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import CustomHeading from "../../components/Common/CustomHeading";
import StatusBadge from "../../components/Common/StatusBadge";
import Payments from "../../components/AgentDetailsTabs/Payments";
import Notes from "../../components/AgentDetailsTabs/Notes";
import Performance from "../../components/AgentDetailsTabs/Performance";
import Overview from "../../components/AgentDetailsTabs/Overview";
import Documents from "../../components/AgentDetailsTabs/Documents";
import DeleteAgentModal from "../../components/ModalComponents/DeleteAgentModal";

const AgentDetail = ({ onBack, agent }) => {
  const agentId = agent?._id;
  console.log("🚀 ~ AgentDetail ~ agentId:", agentId);
  const [activeTab, setActiveTab] = useState("Overview");

  const renderTab = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;

      case "Payments":
        return <Payments />;
      case "Notes":
        return <Notes />;
      case "Performance":
        return <Performance />;
      case "Documents":
        return <Documents />;
      default:
        return null;
    }
  };

  const tabs = [
    { name: "Overview", icon: <Icons.UserIcon size={18} /> },
    { name: "Payments", icon: <Icons.PaymentIcon size={18} /> },
    { name: "Notes", icon: <Icons.Document size={18} /> },
    { name: "Performance", icon: <Icons.PollIcon size={18} /> },
    { name: "Documents", icon: <Icons.Upload size={18} /> },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mt-6">
        <div
          onClick={onBack}
          className="flex cursor-pointer items-center text-primary text-xl gap-2"
        >
          <Icons.ArrowBack />
          Back
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-[#4495FE] rounded-md px-3 py-2 text-white text-base font-medium font-poppins">
            <Icons.SnowFlake size={23} />
            Freeze Agent
          </button>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex items-center gap-2 bg-[#F50408]/10 text-[#F50408] rounded-md px-3 py-2 text-base font-medium font-poppins"
          >
            <Icons.DeleteIcon size={21} />
            Delete Agent
          </button>
        </div>
        <DeleteAgentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          agentId={agentId}
        />
      </div>
      <div className="bg-white border rounded-lg p-4 font-poppins mt-10 grid grid-cols-[0.75fr_9fr_1.25fr] gap-3 flex-wrap">
        <section className="flex  justify-center">
          <div className="flex items-center font-bold text-2xl justify-center bg-[#F3F4F6] rounded-full h-16 w-16 p-5">
            SW
          </div>
        </section>

        <section className="flex flex-col">
          <div className="flex items-center gap-3 ">
            <CustomHeading
              heading={agent?.firstName + " " + agent?.lastName}
              fontSize="text-[28px]"
            />
            <StatusBadge status={agent?.status} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-3">
            <div className="flex text-paragraphText items-center gap-2">
              <Icons.Envelope />
              <p className=" text-base font-normal ">{agent?.email || "--"}</p>
            </div>
            <div className="flex text-paragraphText items-center gap-2">
              <Icons.PhoneIcon />
              <p className=" text-base font-normal ">
                {agent?.phoneNumber || "--"}
              </p>
            </div>
            <div className="flex text-paragraphText items-center gap-2">
              <Icons.BuildingIcon />
              <p className=" text-base font-normal ">
                {agent?.properties || "--"}
              </p>
            </div>
            <div className="flex text-paragraphText mt-3 items-center gap-2">
              <Icons.GlobeIcons size={20} />
              <p className=" text-base font-normal ">
                {agent?.website || "--"}
              </p>
            </div>
            <div className="flex text-paragraphText mt-3 items-center gap-2">
              <Icons.LocationIcon size={20} />
              <p className=" text-base font-normal ">
                {agent?.operatingArea || "--"}
              </p>
            </div>
            <div className="flex text-paragraphText mt-3 items-center gap-2">
              <Icons.HomeIcon size={20} />
              <p className=" text-base font-normal ">
                {agent?.address || "--"}
              </p>
            </div>
            <div className="flex text-paragraphText  items-center gap-2">
              <Icons.CalendarIcon size={20} />
              <p className=" text-base font-normal ">
                Joined {agent.createdAt?.slice(0, 10) || "--"}
              </p>
            </div>
            <p className=" text-base font-normal  text-[#6B7280] bg-[#6B7280]/10 rounded-lg w-32 text-center p-2">
              {" "}
              {agent?.agentCode || " --"}
            </p>
          </div>
        </section>
        <section className="max-w-[146px] space-y-3">
          <div className="bg-[#F3F4F6] px-6 py-4 flex flex-col items-center justify-center gap-1 text-base  font-semibold rounded-md">
            <div className="flex items-center gap-1 text-primaryGreen">
              <Icons.CircleCheck size={22} />
              {agent?.subscriptionStatus || "--"}
            </div>
            <p className="text-paragraphText text-xs md:text-sm font-poppins font-medium">
              Subscription
            </p>
          </div>
          <div className="bg-[#F3F4F6] px-6 py-4 flex flex-col items-center justify-center gap-1 text-base  font-semibold rounded-md">
            <div className="flex items-center gap-1 ">
              <Icons.DollarIcon size={22} className="text-primaryGreen" />
              £1,188
            </div>
            <p className="text-paragraphText text-xs md:text-sm font-poppins font-medium">
              Total Paid
            </p>
          </div>
        </section>
      </div>
      <div className="flex space-x-6 my-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-8 flex items-center gap-2 font-poppins py-2 font-medium cursor-pointer text-base rounded-lg transition-all duration-200
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
    </>
  );
};

export default AgentDetail;
