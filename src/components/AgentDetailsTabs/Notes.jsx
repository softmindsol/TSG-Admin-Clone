import React, { useState } from "react";
import { useAgentNotes } from "../../hooks/useAgents";
import CustomHeading from "../Common/CustomHeading";
import AddNewNoteModal from "../ModalComponents/AddNewNoteModal";

const Notes = ({ agentId }) => {
  const { notes, isLoading, isError, addNote } = useAgentNotes(agentId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading notes...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        Error loading notes
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <CustomHeading heading="Internal Notes" fontSize="text-xl" />
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-gray-700 font-poppins"
          >
            Add Note
          </button>
          <AddNewNoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddNote={addNote}
          />
        </div>
        {notes?.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={note._id || index}
              className="rounded-lg p-4 mb-4 border-l-4"
              style={{
                borderColor: note.urgent ? "#F50408" : "#1877F2",
                backgroundColor: note.urgent ? "#FFF1F1" : "#F2F9FF",
              }}
            >
              <p className="text-[#081722] font-normal text-base font-poppins">
                {note.content}
              </p>
              <p className="text-[#6B7280] font-normal font-poppins text-xs">
                By Admin • {formatDate(note.createdAt)}
                {note.urgent && " • Urgent"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No notes available</p>
        )}
      </div>
    </>
  );
};

export default Notes;
