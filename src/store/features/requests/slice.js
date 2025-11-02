import { createSlice } from "@reduxjs/toolkit";
import {
  getAllRequest,
  approveAgentRequest,
  rejectAgentRequest,
} from "./service";

const initialState = {
  getAllRequest: {
    isLoading: false,
    isSuccess: false,
    data: [],
    errorMessage: "",
  },
  approveAgentRequest: {
    isLoading: false,
    isSuccess: false,
    data: null,
    errorMessage: "",
  },
  rejectAgentRequest: {
    isLoading: false,
    isSuccess: false,
    data: null,
    errorMessage: "",
  },
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- GET ALL REQUESTS ---
    builder
      .addCase(getAllRequest.pending, (state) => {
        state.getAllRequest.isLoading = true;
        state.getAllRequest.errorMessage = "";
      })
      .addCase(getAllRequest.fulfilled, (state, action) => {
        state.getAllRequest.isLoading = false;
        state.getAllRequest.isSuccess = true;
        state.getAllRequest.data = action.payload?.data || [];
      })
      .addCase(getAllRequest.rejected, (state, action) => {
        state.getAllRequest.isLoading = false;
        state.getAllRequest.isSuccess = false;
        state.getAllRequest.errorMessage = action.payload;
      });

    // --- APPROVE AGENT REQUEST ---
    builder
      .addCase(approveAgentRequest.pending, (state) => {
        state.approveAgentRequest.isLoading = true;
        state.approveAgentRequest.errorMessage = "";
      })
      .addCase(approveAgentRequest.fulfilled, (state, action) => {
        state.approveAgentRequest.isLoading = false;
        state.approveAgentRequest.isSuccess = true;
        state.approveAgentRequest.data = action.payload;

        // ✅ Update list locally
        const approvedId = action.meta.arg;
        state.getAllRequest.data = state.getAllRequest.data.filter(
          (req) => req._id !== approvedId
        );
      })
      .addCase(approveAgentRequest.rejected, (state, action) => {
        state.approveAgentRequest.isLoading = false;
        state.approveAgentRequest.isSuccess = false;
        state.approveAgentRequest.errorMessage = action.payload;
      });

    // --- REJECT AGENT REQUEST ---
    builder
      .addCase(rejectAgentRequest.pending, (state) => {
        state.rejectAgentRequest.isLoading = true;
        state.rejectAgentRequest.errorMessage = "";
      })
      .addCase(rejectAgentRequest.fulfilled, (state, action) => {
        state.rejectAgentRequest.isLoading = false;
        state.rejectAgentRequest.isSuccess = true;
        state.rejectAgentRequest.data = action.payload;

        // ✅ Remove rejected request from UI
        const rejectedId = action.meta.arg;
        state.getAllRequest.data = state.getAllRequest.data.filter(
          (req) => req._id !== rejectedId
        );
      })
      .addCase(rejectAgentRequest.rejected, (state, action) => {
        state.rejectAgentRequest.isLoading = false;
        state.rejectAgentRequest.isSuccess = false;
        state.rejectAgentRequest.errorMessage = action.payload;
      });
  },
});

export default requestSlice.reducer;
