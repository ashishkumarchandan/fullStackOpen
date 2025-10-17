import "./App.css";
import Notification from "./components/Notification";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

function App() {
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <h2>Notes App 📝</h2>
        <Notification />
        <NoteForm />
        <NotesList />
      </div>
    </>
  );
}

export default App;
