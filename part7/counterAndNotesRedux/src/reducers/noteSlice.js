import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialNotes = [];

const noteSlice = createSlice({
  name: "notes",
  initialState: initialNotes,
  reducers: {
    createNote: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (content) => ({
        payload: { id: nanoid(), content, important: false },
      }),
    },

    toggleImportance: (state, action) => {
      const note = state.find((n) => n.id === action.payload);
      if (note) note.important = !note.important;
    },
  },
});

export const { createNote, toggleImportance } = noteSlice.actions;
export default noteSlice.reducer;
