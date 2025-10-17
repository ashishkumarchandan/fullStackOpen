import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../reducers/notificationSlice";
import { addAnecdote } from "../reducers/anecdotesSlice";

const CreateNew = () => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAnecdote({ content, author, info, votes: 0 }));
    dispatch(showNotification(`A new anecdote "${content}" created!`, 5));
    navigate("/");
    setContent("");
    setAuthor("");
    setInfo("");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content{" "}
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author{" "}
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info{" "}
          <input value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
