import { useState } from "react";
import PropTypes from "prop-types";

const NoteForm = ({ createNote }) => {
  const [content, setContent] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    createNote({ content, important: false });
    setContent("");
  };

  return (
    <form onSubmit={addNote}>
      <input
        value={content}
        onChange={({ target }) => setContent(target.value)}
        placeholder="write note content"
      />
      <button type="submit">save</button>
    </form>
  );
};

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
};

export default NoteForm;
