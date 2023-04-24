import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "64459038fc13ae0343164909",
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
