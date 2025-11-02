import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";

// --- Icon Components ---
// You can keep these in the same file or import them from another file.

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// --- Data for Subscription Plans ---
// Storing data this way makes it easy to add, remove, or change plans.

const plansData = [
  {
    name: "Demo Plan",
    description: "Perfect for small teams getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    featured: false,
    features: [
      { text: "1 Seller Account", available: true },
      { text: "SmartMatch: Limited project visibility", available: true },
      { text: "Send Pitch on Only 10 projects/month", available: true },
      { text: "3-minute video pitch limit", available: true },
      { text: "Priority SmartMatch ranking", available: false },
      { text: "CRM integrations", available: false },
      { text: "Advanced filters", available: false },
    ],
  },
  {
    name: "Shortlist Plan",
    description: "Perfect for small teams getting started",
    monthlyPrice: 49,
    yearlyPrice: 499, // Example yearly price
    featured: false,
    features: [
      { text: "1 Seller Account", available: true },
      { text: "SmartMatch: Limited project visibility", available: true },
      { text: "Send Pitch on Only 10 projects/month", available: true },
      { text: "3-minute video pitch limit", available: true },
      { text: "Priority SmartMatch ranking", available: false },
      { text: "CRM integrations", available: false },
      { text: "Advanced filters", available: false },
    ],
  },
  {
    name: "Standard Plan",
    description: "Perfect for small teams getting started",
    monthlyPrice: 99,
    yearlyPrice: 999,
    featured: true, // This will highlight the card
    features: [
      { text: "1 Seller Account", available: true },
      { text: "SmartMatch: Limited project visibility", available: true },
      { text: "Send Pitch on Only 10 projects/month", available: true },
      { text: "3-minute video pitch limit", available: true },
      { text: "Priority SmartMatch ranking", available: false },
      { text: "CRM integrations", available: false },
      { text: "Advanced filters", available: false },
    ],
  },
];

// --- The Main Component ---

const SubscriptionManagement = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    // Main container - using flex and padding as requested, no background or width.
    <div className="flex flex-col items-start py-4 ">
      {/* Header Section */}
      <section className="flex md:flex-row gap-3 md:gap-0 flex-col items-center justify-center md:justify-between w-full xl:w-[55%] mb-[25px] md:mb-[50px]">
        <div className="flex flex-col items-center text-center ">
          <h1 className="text-lg md:text-xl font-semibold text-[#081722]">
            Subscription Plans
          </h1>
          <p className="text-[#6B7280] text-sm md:text-base mt-1 font-normal">
            Create and manage plans
          </p>
        </div>

        {/* Monthly/Yearly Toggle Switch */}
        <div className="flex items-center bg-[#EFEFEFCF] p-1 rounded-full ">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-colors duration-300 ${
              billingCycle === "monthly"
                ? "bg-white text-[#081722] shadow"
                : "bg-[#EFEFEFCF] text-[#6B7280]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 text-sm md:text-base font-medium rounded-full transition-colors duration-300 ${
              billingCycle === "yearly"
                ? "bg-white text-[#081722] shadow"
                : "bg-[#EFEFEFCF] text-[#6B7280]"
            }`}
          >
            Yearly
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-7 w-full">
        {plansData.map((plan, index) => (
          // Individual Plan Card
          <div
            key={index}
            className={`flex flex-col p-8 bg-white rounded-2xl border ${
              plan.featured && billingCycle === "yearly"
                ? ""
                : "border-gray-200"
            } w-full `}
          >
            {/* Plan Name */}
            <h2 className="text-xl font-bold text-gray-800 text-center">
              {plan.name}
            </h2>

            {/* Price */}
            <div className="flex items-end justify-center my-6">
              <span className="text-5xl font-bold text-gray-900">
                £
                {billingCycle === "monthly"
                  ? plan.monthlyPrice
                  : plan.yearlyPrice}
              </span>
              <span className="text-gray-500 ml-1">
                /{billingCycle === "monthly" ? "month" : "year"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-center text-sm mb-8">
              {plan.description}
            </p>

            <div className="border-t border-gray-200 w-full mb-8"></div>

            {/* Features List */}
            <div className="flex flex-col gap-4 flex-grow">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-3">
                  {feature.available ? (
                    <Icons.TickIcon className="text-[#22C55E]" />
                  ) : (
                    <Icons.Crossicon className="text-[#D1D5DB]" />
                  )}
                  <span className="text-sm text-gray-600">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Edit Button */}
            <button className="w-full mt-10 py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
