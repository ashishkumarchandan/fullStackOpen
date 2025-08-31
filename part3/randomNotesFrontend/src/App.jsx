import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState({ content: "", important: false });

  useEffect(() => {
    const getallData = async () => {
      const response = await axios.get("http://localhost:3001/api/notes");
      setNotes(response.data);
    };

    getallData();
  }, []);
  // console.log(notes);

  const addChange = async (event) => {
    event.preventDefault();

    const existingNote = notes.find((note) => {
      return note.content.toLowerCase() === newNotes.content.toLowerCase();
    });

    if (existingNote) {
      if (
        window.confirm(
          `Note with content "${newNotes.content}" already exists. Do you want to update its important status?`
        )
      ) {
        try {
          const response = await axios.put(
            `http://localhost:3001/api/notes/${existingNote.id}`,
            { ...existingNote, important: newNotes.important }
          );

          setNotes((prev) => {
            return prev.map((note) => {
              return note.id === existingNote.id ? response.data : note;
            });
          });

          setNewNotes({ content: "", important: false });
        } catch (error) {
          alert("Failed to update note on server");
          console.error(error);
        }
      }
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/notes",
        newNotes
      );

      setNotes((prev) => {
        return [...prev, response.data];
      });
      setNewNotes({ content: "", important: false });
    } catch (error) {
      alert("Failed to add note on server");
      console.error(error);
    }
  };

  const handleContentChange = (event) => {
    setNewNotes((prev) => {
      return { ...prev, content: event.target.value };
    });
  };

  const deleteNode = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`http://localhost:3001/api/notes/${id}`);
        setNotes((prev) => {
          return prev.filter((note) => {
            return note.id !== id;
          });
        });
      } catch (error) {
        alert("Failed to delete note from server");
        console.error(error);
      }
    }
  };
  const handleImportantChange = (event) => {
    setNewNotes((prev) => {
      return {
        ...prev,
        important: event.target.checked,
      };
    });
  };
  console.log(newNotes);
  return (
    <>
      <div>
        <h2>All person</h2>
        <div>
          {notes.map((note) => {
            return (
              <div key={note.id}>
                <p>
                  {note.content}{" "}
                  {note.important ? "Important" : "Not Important"}
                </p>
                <button
                  onClick={() => {
                    return deleteNode(note.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2>Add new Notes</h2>
        <form onSubmit={addChange}>
          <div>
            <p>
              Content:
              <input
                type="text"
                name="content"
                placeholder="content"
                value={newNotes.content}
                onChange={handleContentChange}
                id="customContent"
              />
            </p>

            <p>
              Important:
              <input
                name="important"
                type="checkbox"
                checked={newNotes.important}
                onChange={handleImportantChange}
              />
            </p>
          </div>
          <button type="submit">Add / Update Note</button>
        </form>
      </div>
    </>
  );
}

export default App;
