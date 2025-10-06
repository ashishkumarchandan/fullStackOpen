import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteSlice";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  const dispatch = useDispatch();

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <div>
      <ul>
        {sortedAnecdotes.map((anecdote) => (
          <li key={anecdote.id} style={{ margin: "8px 0" }}>
            {anecdote.content} <strong> ({anecdote.votes} votes) </strong>
            <button
              onClick={() => dispatch(voteAnecdote(anecdote.id))}
              style={{ marginLeft: "10px" }}
            >
              vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
