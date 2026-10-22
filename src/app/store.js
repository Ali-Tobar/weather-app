import { configureStore } from "@reduxjs/toolkit";
import weatherApiReducer from "../features/weatherApi/weatherApiSlice";

// Global Redux store configuration
export const store = configureStore({
  reducer: {
    // Mount the weather slice reducer under the 'weather' key
    weather: weatherApiReducer,
  },
});