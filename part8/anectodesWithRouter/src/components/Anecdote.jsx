import React from "react";
import { useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdotesSlice";
import { showNotification } from "../reducers/notificationSlice";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  if (!anecdote) return <p>Anecdote not found!</p>;

  const handleVote = () => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(showNotification(`You voted for "${anecdote.content}"`, 5));
  };

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>by {anecdote.author}</p>
      <p>
        has {anecdote.votes} votes <button onClick={handleVote}>vote</button>
      </p>
      <p>
        for more info see: <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
