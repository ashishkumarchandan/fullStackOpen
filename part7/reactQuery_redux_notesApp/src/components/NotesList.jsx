import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import noteService from "../services/noteService";
import { showNotification } from "../reducers/notificationSlice";
import Loader from "./Loader";

const NotesList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: noteService.getNotes,
  });

  const updateNoteMutation = useMutation({
    mutationFn: noteService.updateNote,
    onSuccess: (updatedNote) => {
      const oldNotes = queryClient.getQueryData(["notes"]) || [];
      queryClient.setQueryData(
        ["notes"],
        oldNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n))
      );
      dispatch(showNotification("Note updated!", "success"));
    },
  });

  const handleToggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading notes 😢</div>;
  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              cursor: "pointer",
              margin: "8px 0",
              color: note.important ? "green" : "black",
            }}
            onClick={() => handleToggleImportance(note)}
          >
            {note.content}{" "}
            <strong>{note.important ? "(Important)" : "(Normal)"}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
