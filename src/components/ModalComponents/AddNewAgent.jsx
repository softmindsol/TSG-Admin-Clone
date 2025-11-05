import React, { useState } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoCloseCircle } from "react-icons/io5";

import { LuUser, LuUser2 } from "react-icons/lu";
import FormInput from "../Common/FormInput";
import SelectInput from "../Common/SelectInput";
import GlobalButton from "../Common/GlobalButton";
import { useCreateAgent } from "../../hooks/useAgents";
import { toast } from "sonner";

const AddNewAgent = ({ isOpen, onClose, onAgentCreated }) => {
  const { createAgent } = useCreateAgent();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    operatingArea: "",
    agentType: "",
    experience: "",
    password: "",
    status: "approved",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "companyName",
      "operatingArea",
      "agentType",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field]?.trim()
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createAgent(formData);
      toast.success("Agent created successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        operatingArea: "",
        agentType: "",
        experience: "",
        password: "",
        status: "approved",
      });

      onClose();

      // Call callback if provided
      if (onAgentCreated) {
        onAgentCreated(response.data.agent);
      }
    } catch (error) {
      console.error("Failed to create agent:", error);
      toast.error(error.response?.data?.message || "Failed to create agent");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    // Modal Overlay - Render as portal to body
    <div
      className="fixed inset-0 flex justify-center items-center z-[99999] p-4 font-poppins bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Modal Panel */}
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide p-8 relative z-[99999]"
        onClick={(e) => e.stopPropagation()}
      >
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
          {/* Agent Overview Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Agent Information
            </h3>
            <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormInput
                label="First Name *"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter first name"
                required
              />
              <FormInput
                label="Last Name *"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
              <FormInput
                label="Email Address *"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />
              <FormInput
                label="Phone Number *"
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="+1234567890"
                required
              />
              <FormInput
                label="Company Name *"
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                placeholder="Enter company name"
                required
              />
              <FormInput
                label="Operating Area *"
                id="operatingArea"
                value={formData.operatingArea}
                onChange={(e) =>
                  handleInputChange("operatingArea", e.target.value)
                }
                placeholder="Enter operating area"
                required
              />
              <SelectInput
                label="Agent Type *"
                id="agentType"
                value={formData.agentType}
                onChange={(value) => handleInputChange("agentType", value)}
                placeholder="Select agent type"
                options={[
                  { value: "individual", label: "Individual" },
                  { value: "agency", label: "Agency" },
                ]}
                required
              />
              <FormInput
                label="Experience"
                id="experience"
                value={formData.experience}
                onChange={(e) =>
                  handleInputChange("experience", e.target.value)
                }
                placeholder="e.g. 5 years"
              />
              <FormInput
                label="Password (optional)"
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Leave empty for auto-generated password"
              />
              <SelectInput
                label="Status"
                id="status"
                value={formData.status}
                onChange={(value) => handleInputChange("status", value)}
                placeholder="Select status"
                options={[
                  { value: "approved", label: "Approved" },
                  { value: "pending", label: "Pending" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4">
          <GlobalButton
            variant="secondary"
            onClick={onClose}
            className="px-8"
            disabled={isSubmitting}
          >
            Cancel
          </GlobalButton>
          <GlobalButton
            variant="primary"
            onClick={handleSubmit}
            className="px-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Agent"}
          </GlobalButton>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AddNewAgent;
