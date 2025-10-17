import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from "./reducers/anecdotesSlice";
import notificationReducer from "./reducers/notificationSlice";

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
  },
});

export default store;
