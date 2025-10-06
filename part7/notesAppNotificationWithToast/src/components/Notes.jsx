// src/components/Notes.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportance, createNote } from "../reducers/noteSlice";
import { toast } from "react-toastify";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const filter = useSelector((state) => state.filter);
  const [newNote, setNewNote] = useState("");

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

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim() === "") {
      toast.warn("Note content cannot be empty!");
      return;
    }
    dispatch(createNote(newNote));
    toast.success(`Note added: "${newNote}"`);
    setNewNote(""); // Clear input
  };

  return (
    <div>
      {/* ✅ Create Note Form */}
      <form onSubmit={handleAddNote} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note..."
          style={{
            padding: "8px",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Note
        </button>
      </form>

      {/* 📝 Notes List */}
      <ul>
        {filteredNotes.map((note) => (
          <li
            key={note.id}
            style={{
              padding: "8px 0",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{note.content}</span>
            <button
              onClick={() => handleToggle(note)}
              style={{
                background: "none",
                border: "1px solid #999",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {note.important ? "🌟 Unmark" : "⭐ Mark Important"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;