import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import noteService from "../services/noteService";
import { showNotification } from "../reducers/notificationSlice";

const NoteForm = () => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const addNoteMutation = useMutation({
    mutationFn: noteService.createNote,
    onSuccess: (newNote) => {
      const oldNotes = queryClient.getQueryData(["notes"]) || [];
      queryClient.setQueryData(["notes"], [...oldNotes, newNote]);
      dispatch(showNotification("Note added successfully!", "success"));
    },
    onError: () => {
      dispatch(showNotification("Failed to add note!", "error"));
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim().length < 5) {
      dispatch(showNotification("Note must be at least 5 characters", "error"));
      return;
    }
    addNoteMutation.mutate({ content, important: true });
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a note..."
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default NoteForm;
