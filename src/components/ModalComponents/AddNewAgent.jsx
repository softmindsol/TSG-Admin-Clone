import React, { useState } from "react";
import { IoClose, IoCloseCircle } from "react-icons/io5";

import { LuUser, LuUser2 } from "react-icons/lu";
import FormInput from "../Common/FormInput";
import SelectInput from "../Common/SelectInput";
import GlobalButton from "../Common/GlobalButton";
import FileUpload from "../Common/FileUpload";

const AddNewAgent = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState("");

  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0  flex justify-center items-center z-50 p-4 font-poppins">
      <div className="absolute inset-0 h-screen bg-black opacity-80"></div>
      {/* Modal Panel */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Modal Header */}
        <div className="flex items-start pb-6 border-b border-gray-200">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <LuUser2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">
              Add New Agent
            </h2>
            <p className="text-base text-gray-500">
              Create a new agent profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoCloseCircle size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="py-6">
          {/* Client Overview Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Agent Overview
            </h3>
            <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormInput label="Agent Name" id="agentName" value="Enter Name" />
              <FormInput label="Agent Code" id="agentCode" value="CLT-48XYZ1" />
              <FormInput
                label="Agent Email Address"
                id="email"
                type="email"
                placeholder="Enter Email"
              />
              <FormInput
                label="Agent Website Link"
                id="email"
                type="email"
                placeholder="Enter Link"
              />
              <FormInput
                type="phone"
                label="Phone Number"
                id="phone"
                placeholder="+44 7346 876 773"
              />
              <SelectInput
                label="Agent Type"
                id="assignedAgent"
                placeholder="Select Agent"
                options={[
                  { value: "residential_sales", label: "Residential Sales" },
                  {
                    value: "residential_lettings",
                    label: "Residential Lettings",
                  },
                  { value: "commercial_sales", label: "Commercial Sales" },
                  {
                    value: "commercial_lettings",
                    label: "Commercial Lettings",
                  },
                  { value: "investor", label: "Investor" },
                ]}
              />
              <FormInput
                label="Company Name"
                id="companyname"
                type="text"
                placeholder="Enter Company Name"
              />

              <SelectInput
                label="Location"
                id="location"
                placeholder="Select Type"
                options={[
                  { value: "residential_sales", label: "Residential Sales" },
                  {
                    value: "residential_lettings",
                    label: "Residential Lettings",
                  },
                  { value: "commercial_sales", label: "Commercial Sales" },
                  {
                    value: "commercial_lettings",
                    label: "Commercial Lettings",
                  },
                  { value: "investor", label: "Investor" },
                ]}
              />
              <SelectInput
                label="Subscription Status"
                id="status"
                placeholder="Select Type"
                options={[
                  { value: "residential_sales", label: "Paid" },
                  {
                    value: "residential_lettings",
                    label: "Unpaid",
                  },
                  { value: "commercial_sales", label: "Pending" },
                ]}
              />
              <SelectInput
                label="Agent Status"
                id="status"
                placeholder="Select Type"
                options={[
                  { value: "residential_sales", label: "Active" },
                  {
                    value: "residential_lettings",
                    label: "Inactive",
                  },
                ]}
              />
              <SelectInput
                label="Subscription Plan"
                id="status"
                placeholder="Standard"
                options={[
                  { value: "residential_sales", label: "Active" },
                  {
                    value: "residential_lettings",
                    label: "Inactive",
                  },
                ]}
              />
              <FormInput label="Monthly Rate" id="rate" placeholder="$ 199" />
            </div>
            <FormInput
              label="Company Address"
              id="address"
              value="Enter Address"
            />
          </div>

          {/* Notes Section */}
          <div className="mb-3">
            <label
              htmlFor="notes"
              className="block text-lg font-semibold text-gray-800 mb-3"
            >
              Bio & Information
            </label>
            <textarea
              id="notes"
              rows="4"
              placeholder="e.g Looking for move-in ready properties with good foot traffic"
              className="w-full p-4 border border-gray-300 rounded-md text-xs md:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-8">
            <label
              htmlFor="notes"
              className="block text-lg font-semibold text-gray-800 mb-3"
            >
              Internal Notes
            </label>
            <textarea
              id="notes"
              rows="4"
              placeholder="e.g Looking for move-in ready properties with good foot traffic"
              className="w-full p-4 border border-gray-300 rounded-md text-xs md:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <FileUpload />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4">
          <GlobalButton variant="secondary" onClick={onClose} className="px-8">
            Cancel
          </GlobalButton>
          <GlobalButton variant="primary" className="px-10">
            Add Agent{" "}
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default AddNewAgent;
