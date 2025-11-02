// src/hooks/useRequests.js
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import api from "../utils/constants/Api";
import config from "../utils/constants/endpoint";
import {
  approveAgentRequest,
  rejectAgentRequest,
} from "../store/features/requests/service";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

// Reusable fetcher using your api instance
const fetcher = async (url) => {
  const res = await api.get(url);
  return res.data?.data || [];
};

// Custom hook
export const useRequests = () => {
  const dispatch = useDispatch();

  // ✅ SWR handles fetching & caching
  const {
    data: requests,
    error,
    isLoading,
    mutate,
  } = useSWR(`${API_BASE_URL}/${config.request.getAllRequest}`, fetcher, {
    revalidateOnFocus: false,
  });

  // ✅ Approve Agent
  const handleApprove = async (agentId) => {
    try {
      await dispatch(approveAgentRequest(agentId)).unwrap();
      toast.success("Agent approved!");
      // locally remove approved agent
      mutate((prev) => prev.filter((r) => r._id !== agentId), false);
    } catch (err) {
      toast.error(err?.message || "Failed to approve agent");
    }
  };

  // ✅ Reject Agent
  const handleReject = async (agentId) => {
    try {
      await dispatch(rejectAgentRequest(agentId)).unwrap();
      toast.success("Agent rejected!");
      mutate((prev) => prev.filter((r) => r._id !== agentId), false);
    } catch (err) {
      toast.error(err?.message || "Failed to reject agent");
    }
  };

  return {
    requests: requests || [],
    isLoading,
    isError: !!error,
    approveAgent: handleApprove,
    rejectAgent: handleReject,
    refresh: mutate,
  };
};
