import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserForm from "./components/UserForm";
import Users from "./components/Users";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "2rem auto",
        padding: "1.5rem",
        borderRadius: 8,
        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <header style={{ marginBottom: "1rem" }}>
        <h1 style={{ margin: 0 }}>
          👥 Users CRUD (React Query + Redux Toolkit)
        </h1>
        <p style={{ marginTop: 6, color: "#555" }}>
          Demo: fetch / add / update / delete users. API calls live in{" "}
          <code>services/usersService.js</code>.
        </p>
      </header>

      <main>
        <UserForm />
        <Users />
      </main>
    </div>
  );
}

export default App;
