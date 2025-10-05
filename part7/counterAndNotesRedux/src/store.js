import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./reducers/counterSlice.js";
import noteReducer from "./reducers/noteSlice.js";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    notes: noteReducer,
  },
});

export default store;
