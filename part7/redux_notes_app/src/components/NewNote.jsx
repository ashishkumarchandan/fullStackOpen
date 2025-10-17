import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value.trim();
    event.target.note.value = "";
    dispatch(createNote(content));
    dispatch(setNotification(`New note added: "${content}"`, 5));
  };
  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewNote;
