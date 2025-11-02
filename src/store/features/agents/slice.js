import { createSlice } from "@reduxjs/toolkit";
import { getAllAgent, deleteAgent } from "./service";

const initialState = {
  getAllAgent: {
    isLoading: false,
    isSuccess: false,
    data: [],
    errorMessage: "",
  },
  deleteAgent: {
    isLoading: false,
    isSuccess: false,
    data: null,
    errorMessage: "",
  },
};

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- GET ALL AGENTS ---
    builder
      .addCase(getAllAgent.pending, (state) => {
        state.getAllAgent.isLoading = true;
        state.getAllAgent.errorMessage = "";
      })
      .addCase(getAllAgent.fulfilled, (state, action) => {
        state.getAllAgent.isLoading = false;
        state.getAllAgent.isSuccess = true;
        state.getAllAgent.data = action.payload?.data || [];
      })
      .addCase(getAllAgent.rejected, (state, action) => {
        state.getAllAgent.isLoading = false;
        state.getAllAgent.isSuccess = false;
        state.getAllAgent.errorMessage = action.payload;
      });

    // --- DELETE AGENT ---
    builder
      .addCase(deleteAgent.pending, (state) => {
        state.deleteAgent.isLoading = true;
        state.deleteAgent.errorMessage = "";
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.deleteAgent.isLoading = false;
        state.deleteAgent.isSuccess = true;
        state.deleteAgent.data = action.payload;

        // ✅ Remove deleted agent from list without refreshing
        const deletedId = action.meta.arg;
        state.getAllAgent.data = state.getAllAgent.data.filter(
          (agent) => agent._id !== deletedId
        );
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.deleteAgent.isLoading = false;
        state.deleteAgent.isSuccess = false;
        state.deleteAgent.errorMessage = action.payload;
      });
  },
});

export default agentsSlice.reducer;
