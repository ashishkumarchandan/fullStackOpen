import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { initializeNotes } from "./reducers/noteReducer";
import Notes from "./components/Notes";
import NewNote from "./components/NewNote";
import Notification from "./components/Notification";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);
  return (
    <>
      <h2>Notes</h2>
      <Notification />
      <Notes />
      <NewNote />
    </>
  );
}

export default App;
