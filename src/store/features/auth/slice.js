import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import authService from "./service";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            const { token, admin } = response.data;
            localStorage.setItem("token", token);
            return { token, admin };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        admin: null,
        token: localStorage.getItem("token") || null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.admin = null;
            state.token = null;
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.admin = action.payload.admin;
                state.token = action.payload.token;
                toast.success("Login successful");
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload || "Login failed");
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;