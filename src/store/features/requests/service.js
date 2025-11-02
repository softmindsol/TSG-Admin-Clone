import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/constants/Api";
import config from "../../../utils/constants/endpoint";

// ✅ GET ALL REQUESTS
export const getAllRequest = createAsyncThunk(
  "request/getAllRequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(config.request.getAllRequest);
      toast.success("Fetched all agent requests successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch agent requests";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ APPROVE AGENT REQUEST
export const approveAgentRequest = createAsyncThunk(
  "request/approveAgentRequest",
  async (agentId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${config.request.approveAgentRequest}/${agentId}`
      );
      toast.success("Agent request approved successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to approve request";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ REJECT AGENT REQUEST
export const rejectAgentRequest = createAsyncThunk(
  "request/rejectAgentRequest",
  async (agentId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.request.rejectAgentRequest}/${agentId}`
      );
      toast.success("Agent request rejected successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to reject request";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
