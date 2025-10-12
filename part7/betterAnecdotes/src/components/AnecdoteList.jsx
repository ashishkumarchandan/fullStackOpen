import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteSlice";
import { showNotification } from "../reducers/notificationSlice";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const {
    items: anecdotes,
    status,
    error,
  } = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filtered = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(showNotification(`You voted '${anecdote.content} '`, 5));
  };

  if (status === "loading") return <p>loading anecdotes...</p>;

  if (status === "failed") return;
  <p>Error: {error}</p>;
  return (
    <div>
      {sorted.map((anecdote) => (
        <div
          key={anecdote.id}
          style={{
            marginBottom: 8,
          }}
        >
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}> vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
