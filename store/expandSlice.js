import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const expandSlice = createSlice({
  name: "expand",
  initialState,
  reducers: {
    change: (state) => {
      state.value = !state.value;
    },
  },
});

export const { change } = expandSlice.actions;

export default expandSlice.reducer;
