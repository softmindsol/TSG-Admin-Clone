import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

const FileUpload = ({ onFileSelect, disabled = false }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
    // Reset the input
    event.target.value = null;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (disabled) return;

    const files = event.dataTransfer.files;
    if (files.length > 0 && onFileSelect) {
      onFileSelect(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-3">
        Upload Documents
      </label>
      <div
        className={`flex flex-col items-center justify-center w-full h-44 p-4 bg-white border-2 border-dashed rounded-md text-center cursor-pointer transition-colors ${
          disabled
            ? "border-gray-200 bg-gray-50 cursor-not-allowed"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        }`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <FiUploadCloud
          className={`w-8 h-8 mb-3 ${
            disabled ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <p
          className={`text-base mt-1 ${
            disabled ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {disabled
            ? "Uploading..."
            : "Drag and drop files here, or click to browse"}
        </p>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Supports PDF, DOC, DOCX, JPG, PNG
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        disabled={disabled}
      />
    </div>
  );
};

export default FileUpload;
