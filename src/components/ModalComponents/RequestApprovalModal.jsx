import Icons from "../../assets/icons/Icons";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import GlobalButton from "../Common/GlobalButton";
import { useDispatch } from "react-redux";

import { toast } from "sonner";
import {
  approveAgentRequest,
  rejectAgentRequest,
} from "../../store/features/requests/service";

const RequestApprovalModal = ({
  isOpen,
  onClose,
  selectedAgent,
  refreshRequests, // 👈 optional callback to refresh data after update
}) => {
  const dispatch = useDispatch();

  if (!isOpen || !selectedAgent) return null;

  // ✅ Extract ID and all necessary fields
  const {
    _id,
    firstName,
    lastName,
    email,
    phoneNumber,
    companyName,
    operatingArea,
    agentType,
    createdAt,
    status = "pending",
  } = selectedAgent;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");
  const isProcessed = status !== "pending";
  const agentId = "32627627362332";
  const confrmAgentId = _id;
  // ✅ Handle Approve / Reject Actions
  const handleDecision = async (decisionType) => {
    try {
      if (decisionType === "Approved") {
        await dispatch(approveAgentRequest(confrmAgentId)).unwrap();
        toast.success("Agent request approved successfully!");
      } else {
        await dispatch(rejectAgentRequest(agentId)).unwrap();
        toast.success("Agent request rejected successfully!");
      }

      onClose();
      if (refreshRequests) refreshRequests(); // Optional refresh callback
    } catch (error) {
      toast.error("Something went wrong while processing the request.");
      console.error("Decision Error:", error);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex justify-center items-center z-[99999] p-4 font-poppins bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-[99999]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 font-bold p-4 rounded-full h-12 w-12 flex items-center justify-center">
              {`${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                {firstName} {lastName}
                <span
                  className={`text-xs md:text-sm font-medium px-3 py-1 rounded-full ${
                    status === "approved"
                      ? "bg-green-100 text-green-700"
                      : status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </h2>
              <p className="text-xs md:text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Icons.CalendarIcon className="w-4 h-4" />
                Submitted {formattedDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {/* CONTACT & COMPANY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* CONTACT DETAILS */}
            <div className="h-full">
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Contact Details
              </h3>
              <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
                <p className="font-semibold text-gray-800">
                  {firstName} {lastName}
                </p>
                <div className="grid grid-cols-2 justify-between gap-3">
                  <div className="flex items-center text-gray-600 text-xs md:text-sm gap-2">
                    <Icons.MailIcon className="w-4 h-4" />
                    {email}
                  </div>
                  <div className="flex items-center text-gray-600 text-xs md:text-sm gap-2">
                    <Icons.LocationIcon className="w-4 h-4" />
                    {operatingArea}
                  </div>
                  <div className="flex items-center text-gray-600 text-xs md:text-sm gap-2">
                    <Icons.MessageIcon2 className="w-4 h-4" />
                    {phoneNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* COMPANY DETAILS */}
            <div className="h-full">
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Company Details
              </h3>
              <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
                <p className="font-semibold text-gray-800">{companyName}</p>
                <div className="flex items-center text-gray-600 text-xs md:text-sm gap-2">
                  <Icons.UserIcon className="w-4 h-4" />
                  {agentType}
                </div>
                <div className="flex items-center text-blue-600 text-xs md:text-sm gap-2">
                  <Icons.GlobeIcons className="w-4 h-4" />
                  www.companywebsite.com
                </div>
              </div>
            </div>
          </div>

          {/* BIO & INTRO */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              Bio & Introduction
            </h3>
            <div className="border rounded-lg p-4">
              <p className="text-gray-600 text-xs md:text-sm">
                {selectedAgent.bioIntro ||
                  "No bio or introduction available for this agent."}
              </p>
            </div>
          </div>

          {/* INTERNAL NOTES */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold text-gray-700">
                Internal Notes
              </h3>
              <button className="text-blue-600 font-semibold text-xs md:text-sm">
                + Add Note
              </button>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
              <p className="text-xs md:text-sm">
                Strong references from previous career
              </p>
              <p className="text-xs text-gray-500 mt-1">By Admin 28/01/2025</p>
            </div>
          </div>

          {/* REQUEST TIMELINE */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              Request Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-gray-800 font-medium text-xs md:text-sm">
                  Request Submitted
                </p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">
                  {formattedDate}
                </p>
              </div>

              {isProcessed && (
                <div
                  className={`border rounded-lg p-4 ${
                    status === "approved"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <p
                    className={`font-medium text-xs md:text-sm ${
                      status === "approved" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {status === "approved"
                      ? "Request Approved"
                      : "Request Rejected"}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    {new Date().toLocaleDateString("en-GB")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          {!isProcessed ? (
            <div className="flex flex-col lg:flex-row justify-end items-center border-gray-200 gap-4">
              <GlobalButton
                variant="secondary"
                onClick={onClose}
                className="px-8 border border-gray-300 w-full lg:w-fit"
              >
                Cancel
              </GlobalButton>
              <GlobalButton
                variant="secondary"
                className="px-8 border text-red-600 border-red-300 hover:bg-red-50 w-full lg:w-fit"
                onClick={() => handleDecision("Rejected")}
              >
                Reject
              </GlobalButton>
              <GlobalButton
                variant="primary"
                className="px-8 text-white bg-green-600 border border-green-600 hover:bg-green-700 w-full lg:w-fit"
                onClick={() => handleDecision("Approved")}
              >
                Approve
              </GlobalButton>
            </div>
          ) : (
            <div className="flex justify-end items-center border-t pt-4">
              <GlobalButton
                variant="secondary"
                onClick={onClose}
                className="px-8 border border-gray-300 w-full lg:w-fit"
              >
                Close
              </GlobalButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default RequestApprovalModal;
