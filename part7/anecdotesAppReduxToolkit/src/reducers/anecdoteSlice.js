import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, content: "Redux Toolkit is awesome", votes: 0 },
  { id: 2, content: "React + Redux is powerful", votes: 0 },
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
      }
    },
    addAnecdote: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (content) => ({
        payload: {
          id: Date.now(),
          content,
          votes: 0,
        },
      }),
    },
  },
});

export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
