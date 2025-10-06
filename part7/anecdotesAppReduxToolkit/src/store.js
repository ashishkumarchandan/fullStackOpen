import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteSlice.js";

export const store = configureStore({
    reducer:{
        anecdotes: anecdoteReducer,
    }
})