import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser, LoginPayload, RegisterPayload } from "../../types/auth";
import { getMeService, loginService, registerService } from "./authService";

type AuthState = {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
    isLoading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async (payload: RegisterPayload, { rejectWithValue }) => {
        try {
            return await registerService(payload);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed";
            return rejectWithValue(msg);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            return await loginService(payload);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Login failed";
            return rejectWithValue(msg);
        }
    }
);

export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getMeService();
            return res;
        } catch (err: any) {
            const msg = err?.response?.data?.message || "Session expired";
            return rejectWithValue(msg);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
        },
        clearAuthError(state) {
            state.error = null;
        },
        hydrateUser(state, action: PayloadAction<AuthUser>) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Regis
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;
                localStorage.setItem("token", action.payload.data.token);
            })
            .addCase(registerUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Registration failed";
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;
                localStorage.setItem("token", action.payload.data.token);
            })

            .addCase(loginUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload || "Login failed";
            })

            .addCase(loadUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadUser.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.user = action.payload.data;
            })
            .addCase(loadUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem("token");
            })

    },
});

export const { logout, clearAuthError, hydrateUser } = authSlice.actions;
export default authSlice.reducer;
