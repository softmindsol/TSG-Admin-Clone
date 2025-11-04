import React from "react";
import { createPortal } from "react-dom";
import Icons from "../../assets/icons/Icons";
import { IoCloseCircle } from "react-icons/io5";
import CustomHeading from "../Common/CustomHeading";
import FormInput from "../Common/FormInput";
import { deleteAgent } from "../../store/features/agents/service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteAgentModal = ({ isOpen, onClose, agentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDeleteAgent = () => {
    dispatch(deleteAgent(agentId));
    onClose();
    navigate("/dashboard/agents");
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex justify-center items-center z-[99999] p-4 font-poppins bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Modal Panel */}
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-8 relative z-[99999]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start mb-5 pb-6 border-b border-gray-200">
          <div className="bg-[#F50408]/10 p-3 rounded-lg mr-4">
            <Icons.UserIcon className="w-6 h-6 text-[#F50408]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">Delete Agent</h2>
            <p className="text-base text-gray-500">Delete your agent</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoCloseCircle size={24} />
          </button>
        </div>

        <FormInput
          label="Enter Agent code to delete “Sarah Wilson”?"
          id="address"
          value="AGT-76565"
          placeholder="AGT-76565"
        />
        <p className="text-paragraphText pt-3 text-xs md:text-sm font-poppins font-normal">
          This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="border border-primary rounded-md px-5 py-1 text-primary"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAgent}
            className="border border-[#F50408] bg-[#F50408] rounded-md px-5 py-1 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default DeleteAgentModal;
