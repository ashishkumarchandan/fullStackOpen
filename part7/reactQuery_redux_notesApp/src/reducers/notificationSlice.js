import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "info",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    clearNotification(state) {
      state.message = "";
      state.type = "info";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification =
  (message, type = "info", timeout = 3000) =>
  (dispatch) => {
    dispatch(setNotification({ message, type }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };

export default notificationSlice.reducer;
