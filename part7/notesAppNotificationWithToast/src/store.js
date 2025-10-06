import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterSlice.js";
import noteReducer from "./reducers/noteSlice.js";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

export default store;
