import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

export const initializeAnecdotes = createAsyncThunk(
  "anecdotes/fetchAll",
  async () => {
    const anecdotes = await anecdoteService.getAll();
    return anecdotes;
  }
);

export const createAnecdote = createAsyncThunk(
  "anecdotes/create",
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(content);
    return newAnecdote;
  }
);

export const voteAnecdote = createAsyncThunk(
  "anecdotes/vote",
  async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const updated = await anecdoteService.updateVote(
      anecdote.id,
      updatedAnecdote
    );
    return updated;
  }
);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(initializeAnecdotes.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = [...state.items]
          .map((a) => (a.id === updated.id ? updated : a))
          .sort((a, b) => b.votes - a.votes);
      });
  },
});

export default anecdoteSlice.reducer;
