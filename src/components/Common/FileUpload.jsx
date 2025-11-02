import React from "react";
import { FiUploadCloud } from "react-icons/fi";

const FileUpload = () => (
  <div>
    <label className="block text-lg font-semibold text-gray-800 mb-3">
      Upload Documents
    </label>
    <div className="flex flex-col items-center justify-center w-full h-44 p-4 bg-white border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer">
      <FiUploadCloud className="w-8 h-8 text-gray-500 mb-3" />
      <p className="text-base text-gray-600">
        Drag and drop files here, or{" "}
        <span className="font-semibold text-blue-600">click to browse</span>
      </p>
      <p className="text-xs md:text-sm text-gray-400 mt-1">
        Supports PDF, DOC, DOCX, JPG, PNG
      </p>
    </div>
  </div>
);

export default FileUpload;
