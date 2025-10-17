import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Notes = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleToggle = (note) => {
    dispatch(toggleImportanceOf(note.id));
    dispatch(setNotification(`Toggled importance for "${note.content}"`, 5));
  };
  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? "🔥" : "❄️"}</strong>
            <button onClick={() => handleToggle(note)}>toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
