import { configureStore } from "@reduxjs/toolkit";

import anecdoteReducer from "./reducers/anecdoteSlice";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
  },
});

export default store;
