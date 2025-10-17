import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [
    {
      id: "1",
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
    },
    {
      id: "2",
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "https://wiki.c2.com/?PrematureOptimization",
      votes: 0,
    },
  ],
  reducers: {
    addAnecdote(state, action) {
      state.push({ ...action.payload, id: (Math.random() * 10000).toFixed(0) });
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) anecdote.votes += 1;
    },
  },
});

export const { addAnecdote, voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
