import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { initializeAnecdotes } from "./reducers/anecdoteSlice";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
  return (
    <>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
}

export default App;
