import { useState } from "react";
import "./App.css";
import { useMatch } from "react-router-dom";

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
  return <></>;
}

export default App;
