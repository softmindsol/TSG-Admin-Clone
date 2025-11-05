import React, { useState } from "react";
import { createPortal } from "react-dom";
import Icons from "../../assets/icons/Icons";
import { IoCloseCircle } from "react-icons/io5";

const AddNewNoteModal = ({ isOpen, onClose, onAddNote }) => {
  const [content, setContent] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddNote({ content: content.trim(), urgent });
      setContent("");
      setUrgent(false);
      onClose();
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex justify-center items-center z-[99999] p-4 font-poppins bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Modal Panel */}
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide p-8 relative z-[99999]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start pb-6 border-b border-gray-200">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Icons.Document className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">Add Note</h2>
            <p className="text-base text-gray-500">For Sarah Wilson</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          >
            <IoCloseCircle size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Note Details
            </h3>
            <div className="">
              <label
                htmlFor="notes"
                className="block text-base font-semibold text-primary mb-3"
              >
                Note Content
              </label>
              <textarea
                id="notes"
                rows="4"
                placeholder="e.g Looking for move-in ready properties with good foot traffic"
                className="w-full p-4 border border-gray-300 rounded-md text-xs md:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="urgent"
                className="accent-black"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
              />
              <label htmlFor="urgent" className="text-primary font-medium">
                Mark as urgent note
              </label>
            </div>

            <h2 className="bg-[#FFF1F1] text-[#DA0004] mt-3 font-semibold p-4 rounded-lg">
              Urgent notes{" "}
              <span className="font-normal">
                will be highlighted in red and appear at the top of the notes
                list.
              </span>
            </h2>
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AddNewNoteModal;
