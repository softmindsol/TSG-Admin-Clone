import useSWR from "swr";
// ✅ use your global axios setup
import config from "../utils/constants/endpoint";
import api from "../utils/constants/Api";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

// ✅ Fallback check for missing env
if (!API_BASE_URL) {
  console.warn("⚠️ Missing VITE_BASE_API_URL in your .env file!");
}

// ✅ Reusable fetcher for SWR
const fetcher = async (url) => {
  try {
    console.log("📡 Fetching from:", url);
    const res = await api.get(url);
    console.log("✅ Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    throw err;
  }
};

export const useAgent = (id) => {
  const endpoint = id ? `${config.agents.getAgentById}/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher);

  return {
    agent: data?.data || null,
    isLoading,
    isError: !!error,
    refreshAgent: mutate,
  };
};

export const useAgentPaymentInfo = (agentId) => {
  const endpoint = agentId ? `${config.agents.getAgentPaymentInfo}/${agentId}` : null;

  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher);

  return {
    paymentInfo: data?.data || null,
    isLoading,
    isError: !!error,
    refreshPaymentInfo: mutate,
  };
};

export const useAgentNotes = (agentId) => {
  const endpoint = agentId ? `${config.agents.getAgentNotes}/${agentId}/notes` : null;

  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher);

  const addNote = async (noteData) => {
    try {
      await api.patch(`${config.agents.addAgentNote}/${agentId}/note`, noteData);
      mutate(); // Refresh notes
    } catch (err) {
      console.error("Add note failed:", err);
      throw err;
    }
  };

  return {
    notes: data?.data || [],
    isLoading,
    isError: !!error,
    refreshNotes: mutate,
    addNote,
  };
};

export const useAgentFiles = (agentId) => {
  const endpoint = agentId ? `${config.files.getFiles}/${agentId}` : null;

  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher);

  const uploadFile = async (fileData) => {
    try {
      const formData = new FormData();
      formData.append('file', fileData.file);
      if (fileData.name) formData.append('name', fileData.name);

      const response = await api.post(`${config.files.uploadFile}/${agentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      mutate(); // Refresh files
      return response.data;
    } catch (err) {
      console.error("Upload failed:", err);
      throw err;
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await api.delete(`${config.files.deleteFile}/${agentId}/${fileId}`);
      mutate(); // Refresh files
    } catch (err) {
      console.error("Delete failed:", err);
      throw err;
    }
  };

  return {
    files: data?.data || [],
    isLoading,
    isError: !!error,
    refreshFiles: mutate,
    uploadFile,
    deleteFile,
  };
};

export const useCreateAgent = () => {
  const createAgent = async (agentData) => {
    try {
      const response = await api.post(config.agents.createAgent, agentData);
      return response.data;
    } catch (err) {
      console.error("Create agent failed:", err);
      throw err;
    }
  };

  return {
    createAgent,
  };
};

export const useAgents = () => {
  const endpoint = `${config.agents.getAllAgents}?status=all`;

  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher);

  // ✅ Delete Agent API (modular, with revalidation)
  const deleteAgent = async (agentId) => {
    try {
      console.log("🗑️ Deleting agent:", agentId);

      await api.delete(`${config.agents.deleteAgent}/${agentId}`);

      // ✅ Optimistic revalidation (instantly update UI)
      mutate(
        (currentData) => ({
          ...currentData,
          data: currentData.data.filter((agent) => agent._id !== agentId),
        }),
        false
      );
    } catch (err) {
      console.error("❌ Delete failed:", err);
      throw err;
    }
  };

  return {
    agents: data?.data || [],
    isLoading,
    isError: !!error,
    refreshAgents: mutate,
    deleteAgent, // ✅ export delete functionality
  };
};
