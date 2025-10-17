import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";
import notificationReducer from "./reducers/notificationReducer";
const store = configureStore({
  reducer: {
    notes: noteReducer,
    notification: notificationReducer,
  },
});

export default store;
