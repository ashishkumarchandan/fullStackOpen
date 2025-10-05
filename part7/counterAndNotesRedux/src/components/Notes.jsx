import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, toggleImportance } from "../reducers/noteSlice";

const Notes = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    dispatch(createNote(content));
    setContent("");
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={addNote}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a note..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => dispatch(toggleImportance(note.id))}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
