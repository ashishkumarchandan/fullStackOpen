import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";
import About from "./components/About";
import "./App.css";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
