import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

import noteService from "./services/notes";
import loginService from "./services/login";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setMessage({ text: "wrong username or password", type: "error" });
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    const returnedNote = await noteService.create(noteObject);
    setNotes(notes.concat(returnedNote));
  };

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((n) => (n.id !== id ? n : updatedNote)));
    } catch (error) {
      setMessage({
        text: `Note '${note.content}' was already removed`,
        type: "error",
      });
      setTimeout(() => setMessage(null), 5000);
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const deleteNote = async (id) => {
    const note = notes.find((n) => n.id === id);
    if (window.confirm(`Delete note "${note.content}"?`)) {
      await noteService.remove(id);
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />

        <Togglable buttonLabel="login">
          <LoginForm onLogin={handleLogin} />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>Notes</h2>
      <Notification message={message} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>

      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
