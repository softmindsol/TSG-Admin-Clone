import React, { useState } from "react";
import { useAgentFiles } from "../../hooks/useAgents";
import CustomHeading from "../Common/CustomHeading";
import GlobalButton from "../Common/GlobalButton";
import Icons from "../../assets/icons/Icons";
import FileUpload from "../Common/FileUpload";

const Documents = ({ agentId }) => {
  const { files, isLoading, isError, uploadFile, deleteFile } =
    useAgentFiles(agentId);
  const [uploading, setUploading] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      await uploadFile({ file });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await deleteFile(fileId);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading documents...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        Error loading documents
      </div>
    );
  }

  return (
    <section>
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <CustomHeading heading="Documents" />
          {/* <GlobalButton icon={Icons.Upload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Documents"}
          </GlobalButton> */}
        </div>
        <FileUpload onFileSelect={handleFileUpload} disabled={uploading} />
        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              className="flex items-center my-6 justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Left section with icon and document info */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-[#DBEAFE] p-2 rounded-md">
                  <Icons.Document size={22} className=" text-[#2563EB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-[#081722] truncate">
                    {file.name || file.filename}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formatDate(file.uploadedAt)} • {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              {/* Right section with actions */}
              <div className="flex items-center text-primary space-x-3">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:text-gray-600 transition-colors"
                >
                  <Icons.EyeIcon />
                </a>
                <a
                  href={file.url}
                  download
                  className="p-1.5 hover:text-gray-600 transition-colors"
                >
                  <Icons.Download size={20} />
                </a>
                <button
                  onClick={() => handleDeleteFile(file._id)}
                  className="p-1.5 hover:text-red-600 transition-colors"
                >
                  <Icons.DeleteIcon size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No documents uploaded yet
          </p>
        )}
      </div>
    </section>
  );
};

export default Documents;
