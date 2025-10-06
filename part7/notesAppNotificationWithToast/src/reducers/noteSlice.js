import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { content: "reducer defines how redux store works", important: true, id: 1 },
  { content: "state of store can contain any data", important: false, id: 2 },
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote: (state, action) => {
      state.push({
        content: action.payload,
        important: false,
        id: generateId(),
      });
    },
    toggleImportance: (state, action) => {
      const note = state.find((n) => n.id === action.payload);
      if (note) note.important = !note.important;
    },
  },
});

export const { createNote, toggleImportance } = noteSlice.actions;
export default noteSlice.reducer;
