import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/constants/Api";
import config from "../../../utils/constants/endpoint";

// ✅ GET ALL AGENTS
export const getAllAgent = createAsyncThunk(
  "agents/getAllAgent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(config.agents.getAllAgent);
      toast.success("Fetched all agents successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch agents";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ DELETE AGENT
export const deleteAgent = createAsyncThunk(
  "agents/deleteAgent",
  async (agentId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.agents.deleteAgent}/${agentId}`
      );
      toast.success("Agent deleted successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete agent";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
