import React from "react";

const Note = ({ note }) => {
  if (!note) return <p>Note not found 😢</p>;

  return (
    <div>
      <h2>📄 Note Details</h2>
      <p>
        <strong>Content:</strong> {note.content}
      </p>
      <p>
        <strong>User:</strong> {note.user}
      </p>
      <p><strong>Important:</strong> {note.important ? "✅ Yes" : "❌ No"}</p>
    </div>
  );
};

export default Note;
