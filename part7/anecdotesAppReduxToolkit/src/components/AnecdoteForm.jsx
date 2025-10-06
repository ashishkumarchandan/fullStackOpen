import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteSlice";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    dispatch(addAnecdote(content));
    setContent("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write new anecdote..."
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
