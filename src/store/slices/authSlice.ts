//health-platform-mobile/src/store/slices/authSlice.ts
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";


interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}


const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  userId: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {


    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        userId: string;
      }>
    ) => {
      state.accessToken =
        action.payload.accessToken;
      state.refreshToken =
        action.payload.refreshToken;
      state.userId =
        action.payload.userId;
      state.isAuthenticated = true;
    },

    restoreSession: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        userId: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },


    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});


export const {
  loginSuccess,
  restoreSession,
  logout,
} = authSlice.actions;

export default authSlice.reducer;