import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "6171284bfe8e892e5b17d5a0",
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
