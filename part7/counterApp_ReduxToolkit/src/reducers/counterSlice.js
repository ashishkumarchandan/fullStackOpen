import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    zero: () => 0,
  },
});

export const { increment, decrement, zero } = counterSlice.actions;

export default counterSlice.reducer;
