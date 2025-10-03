import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteSlice";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const inputref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = inputref.current.value;
    if (content.trim() === "") return;
    dispatch(createAnecdote(content));
    inputref.current.value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputref} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
