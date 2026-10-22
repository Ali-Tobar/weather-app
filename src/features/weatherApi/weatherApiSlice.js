import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather } from "../../services/weatherApi";

// 1. Async Thunk to fetch weather data for a specific city and language
export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async ({ city, locale }, { rejectWithValue }) => {
    try {
      // Call the weather service to get formatted weather and 24h min/max temps
      const data = await getCurrentWeather(city, locale);
      return data; // Passed automatically to action.payload in fulfilled case
    } catch (error) {
      // rejectWithValue ensures custom server error reaches action.payload instead of undefined
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 2. Three-State Lifecycle: starts with isLoading: true to prevent UI flickering and reading undefined
const initialState = {
  weatherData: null,
  isLoading: true, // Ensures UI waits for API before rendering weather properties
  error: null,
};

// 3. Weather slice definition
export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState,
  reducers: {}, // Synchronous actions go here (empty for now)
  extraReducers: (builder) => {
    builder
      // While the API request is loading
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // When the API request succeeds
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weatherData = action.payload; // Save received weather data
      })
      // When the API request fails
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default weatherApiSlice.reducer;
