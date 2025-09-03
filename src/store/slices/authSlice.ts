import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/authTypes";

const initialState: AuthState = {
  email: null,
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: { name?: string; email: string, role: string } }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setEmail, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
