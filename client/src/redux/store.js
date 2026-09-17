import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import habitReducer from "./habitSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitReducer,
  },
});