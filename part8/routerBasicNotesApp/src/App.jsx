import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import Users from "./components/Users";
import Login from "./components/Login";
import Note from "./components/Note";
import Notes from "./components/Notes";
import Home from "./components/Home";

function App() {
  const [notes] = useState([
    { id: 1, content: "Learn React Router", user: "Alice", important: true },
    { id: 2, content: "Understand useParams", user: "Bob", important: false },
    { id: 3, content: "useMatch is cool", user: "Charlie", important: true },
  ]);

  const [user, setUser] = useState(null);

  const match = useMatch("/notes/:id");
  const note = match
    ? notes.find((n) => n.id === Number(match.params.id))
    : null;

  const login = (username) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };

  const padding = { padding: 5 };
  return (
    <>
      <div>
        📒 Notes App (Complete Demo)
        <nav style={{ marginBottom: "1rem" }}>
          <Link style={padding} to="/">
            Home
          </Link>
          <Link style={padding} to="/notes">
            Notes
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>
          {user ? (
            <>
              <em>{user} logged in</em>
              <button style={padding} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link style={padding} to="/login">
              Login
            </Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes notes={notes} />} />
          <Route path="/notes/:id" element={<Note note={note} />} />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route path="/login" element={<Login onLogin={login} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
