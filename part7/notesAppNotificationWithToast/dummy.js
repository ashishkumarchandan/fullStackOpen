import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportance } from "../reducers/noteSlice";
import { toast } from "react-toastify";

const Notes = () => {
  const dispatch = useDispatch();
  const { notes, filter } = useSelector((state) => state);

  const filteredNotes =
    filter === "ALL"
      ? notes
      : filter === "IMPORTANT"
      ? notes.filter((n) => n.important)
      : notes.filter((n) => !n.important);

  const handleToggle = (note) => {
    dispatch(toggleImportance(note.id));
    toast.success(`Toggled "${note.content}" importance`);
  };

  return (
    <ul>
      {filteredNotes.map((note) => (
        <li
          key={note.id}
          onClick={() => handleToggle(note)}
          style={{ cursor: "pointer", padding: "4px 0" }}
        >
          {note.content} {note.important ? "🌟" : ""}
        </li>
      ))}
    </ul>
  );
};

export default Notes;
