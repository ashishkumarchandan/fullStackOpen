import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../services/notes";

// -------------------- Thunks --------------------

// Initialize notes
export const initializeNotes = createAsyncThunk("notes/fetchAll", async () => {
  const notes = await noteService.getAll();
  return notes;
});

// Create new note
export const createNote = createAsyncThunk("notes/create", async (content) => {
  const newNote = await noteService.createNew(content);
  return newNote;
});

// Toggle importance
export const toggleImportanceOf = createAsyncThunk(
  "notes/toggleImportance",
  async (id, { getState }) => {
    const note = getState().notes.find((n) => n.id === id);
    const updatedNote = { ...note, important: !note.important };
    const returnedNote = await noteService.update(id, updatedNote);
    return returnedNote;
  }
);

// -------------------- Slice --------------------
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

// export default noteSlice.reducer
