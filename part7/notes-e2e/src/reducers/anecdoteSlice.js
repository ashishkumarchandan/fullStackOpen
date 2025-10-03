import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, content: "If it hurts, do it more often", votes: 0 },
  {
    id: 2,
    content: "Adding manpower to a late software project makes it later!",
    votes: 1,
  },
];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
        state.sort((a, b) => b.votes - a.votes);
      }
    },
    createAnecdote: (state, action) => {
      const content = action.payload;
      const newAnecdote = {
        id: Math.floor(Math.random() * 1000000),
        content,
        votes: 0,
      };
      state.push(newAnecdote);
      state.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
