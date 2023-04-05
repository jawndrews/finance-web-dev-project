import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "642ce7930d378f22a805a2a0",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
