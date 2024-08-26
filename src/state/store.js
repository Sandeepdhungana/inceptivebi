import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat/chatSlice";
import authReducer from "./auth/authSlice";
import dashboardReducer from "./superSetSlice/superSetSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    chatInfo: chatReducer,
    authInfo: authReducer,
    dashboardInfo: dashboardReducer,
    userInfo: userReducer
  },
});
