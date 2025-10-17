import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  editingUserId: null,
};

const userFormSlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    startEditing(state, action) {
      const { id, name, email } = action.payload;
      state.editingUserId = id;
      state.name = name;
      state.email = email;
    },
    resetForm(state) {
      state.name = "";
      state.email = "";
      state.editingUserId = null;
    },
  },
});

export const { setName, setEmail, startEditing, resetForm } =
  userFormSlice.actions;

export default userFormSlice.reducer;
