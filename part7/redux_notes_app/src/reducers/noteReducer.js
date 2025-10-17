import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "../services/noteService";

export const initializeNotes = createAsyncThunk("notes/fetchAll", async () => {
  const notes = await noteService.getall();
  return notes;
});

export const createNote = createAsyncThunk("notes/create", async (content) => {
  const newNote = await noteService.createNew(content);
  return newNote;
});

export const toggleImportanceOf = createAsyncThunk(
  "notes/toggleImportance",
  async (id, { getState }) => {
    const note = getState().notes.find((n) => n.id === id);
    const updatedNote = { ...note, important: !note.important };
    const returnedNote = await noteService.update(id, updatedNote);
    return returnedNote;
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeNotes.fulfilled, (state, action) => action.payload)
      .addCase(createNote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(toggleImportanceOf.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        return state.map((n) => (n.id !== updatedNote.id ? n : updatedNote));
      });
  },
});

export default noteSlice.reducer;
