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
