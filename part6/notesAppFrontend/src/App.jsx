import { useEffect, useState } from "react";
import "./App.css";
import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Note from "./components/Note";
import Notification from "./components/Notification";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch notes on load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const initialNotes = await noteService.getAll();
        setNotes(initialNotes);
      } catch (error) {
        showNotification("Failed to fetch notes", "error");
      }
    };
    fetchNotes();
  }, []);

  // Persist login (read localStorage)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  // Notifications helper
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Notes to display (all vs important only)
  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  // Handle login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });

      window.localStorage.setItem(
        "loggedNoteAppUser",
        JSON.stringify(loggedUser)
      );

      noteService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername("");
      setPassword("");
      showNotification(`Welcome ${loggedUser.name}`);
    } catch (error) {
      showNotification("Wrong credentials", "error");
    }
  };

  // Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteAppUser");
    setUser(null);
    noteService.setToken(null);
    showNotification("Logged out successfully");
  };

  // Add new note
  const addNote = async (event) => {
    event.preventDefault();
    try {
      const created = await noteService.create({
        content: newNote,
        important: Math.random() > 0.5,
      });

      setNotes(notes.concat(created));
      setNewNote("");
      showNotification("Note created!");
    } catch (error) {
      showNotification("Failed to create note (maybe not logged in)", "error");
    }
  };

  // Handle input change
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // Toggle importance
  const toggleImportanceOf = async (id) => {
    try {
      const note = notes.find((n) => n.id === id);
      const changedNote = { ...note, important: !note.important };
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      showNotification(`Note importance toggled`);
    } catch (err) {
      showNotification("Note update failed", "error");
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification?.message} type={notification?.type} />

      {!user && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <NoteForm
            newNote={newNote}
            handleNoteChange={handleNoteChange}
            addNote={addNote}
          />
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
