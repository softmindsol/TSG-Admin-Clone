import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import { IoCloseCircle } from "react-icons/io5";
import CustomHeading from "../Common/CustomHeading";
import RadioSelect from "../Common/RadioSelect";
import SelectInput from "../Common/SelectInput";
import CheckboxDropdown from "../Common/CheckboxDropdown";
import GlobalButton from "../Common/GlobalButton";

const SendRemainderModal = ({ isOpen, onClose }) => {
  const [method, setMethod] = useState("email");
  const [reminderType, setReminderType] = useState("template");
  const [selected, setSelected] = useState([]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 p-4 font-poppins">
      <div className="absolute inset-0 h-screen bg-black opacity-80"></div>
      {/* Modal Panel */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        <div className="flex items-start mb-5 pb-6 border-b border-gray-200">
          <div className="bg-[#00AC4F]/10 p-3 rounded-lg mr-4">
            <Icons.SendIcon className="w-6 h-6 text-primaryGreen" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">
              Send Reminder
            </h2>
            <p className="text-base text-gray-500">to Sarah Wilson</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoCloseCircle size={24} />
          </button>
        </div>
        <div className="font-poppins">
          <CustomHeading
            heading="Reminder Details"
            textAlign="text-left"
            fontWeight="font-semibold"
          />
          <div className="border flex items-center gap-3 p-4 my-5 rounded-lg bg-[#F9FAFB]">
            <div className="bg-[#E8E8E8] font-bold text-[15px] flex items-center justify-center p-6 rounded-full w-10 h-10">
              SW
            </div>
            <div className="space-y-1">
              <CustomHeading heading="Sarah Wilson" textAlign="text-left" />
              <div className="flex items-center text-paragraphText text-xs md:text-sm gap-2">
                <Icons.Envelope />
                sarah.wil@gmail.com
              </div>
              <div className="flex items-center text-paragraphText text-xs md:text-sm gap-2">
                <Icons.MessageIcon2 />
                +44 7346 876 773
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <RadioSelect
              heading="Send Method:"
              name="notificationType"
              options={[
                { value: "email", label: "Email" },
                { value: "sms", label: "SMS" },
              ]}
              selectedValue={method}
              onChange={setMethod}
            />
            <RadioSelect
              heading="Reminder Type:"
              name="reminderType"
              options={[
                { value: "template", label: "Use Template" },
                { value: "custom", label: "Custom Message" },
              ]}
              selectedValue={reminderType}
              onChange={setReminderType}
            />

            <CheckboxDropdown
              // label="Reminder Type"
              placeholder="Select payment type"
              options={[
                { value: "payment", label: "Payment Due Reminder" },
                { value: "overdue", label: "Overdue Payment Notice" },
                { value: "renewal", label: "Subscription Renewal" },
              ]}
              value={selected}
              onChange={setSelected}
            />

            {reminderType === "template" && (
              <div>
                <CustomHeading
                  heading="Message Preview"
                  fontSize="text-base"
                  textAlign="text-left"
                />

                <p
                  className="w-full text-paragraphText mt-2 border text-xs md:text-sm border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                >
                  Hi Sarah Wilson,
                  <br />
                  <br />
                  This is a friendly reminder that your subscription payment of
                  £99.00 is due on 2024-02-15.
                  <br />
                  <br />
                  Please ensure your payment is processed to avoid any
                  interruption to your service.
                  <br />
                  <br />
                  If you have any questions, please don't hesitate to contact
                  us.
                  <br />
                  <br />
                  Best regards,
                  <br />
                  Admin Team
                </p>
              </div>
            )}
            {reminderType === "custom" && (
              <div>
                <CustomHeading
                  heading="Custom Message"
                  fontSize="text-base"
                  textAlign="text-left"
                />

                <textarea
                  className="w-full text-paragraphText mt-2 border text-xs md:text-sm border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                ></textarea>
              </div>
            )}

            <div className="flex justify-end items-center space-x-4">
              <GlobalButton
                variant="secondary"
                onClick={onClose}
                className="px-8"
              >
                Cancel
              </GlobalButton>
              {method === "email" ? (
                <GlobalButton variant="primary" className="px-[24px]">
                  Send Email
                </GlobalButton>
              ) : (
                <GlobalButton variant="primary" className="px-[24px]">
                  Send SMS
                </GlobalButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendRemainderModal;
