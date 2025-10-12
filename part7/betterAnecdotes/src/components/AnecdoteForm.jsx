import React from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationSlice";
import { createAnecdote } from "../reducers/anecdoteSlice";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    if (!content) return;
    event.target.anecdote.value = "";
    await dispatch(createAnecdote(content)).unwrap();
    dispatch(showNotification(`You created '${content}`, 5));
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
