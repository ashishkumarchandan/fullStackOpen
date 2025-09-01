import { useEffect, useState } from "react";
import "./App.css";
import notesService from "./services/notesService";
function App() {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState({ content: "", important: false });

  useEffect(() => {
    const getallData = async () => {
      const notesData = await notesService.getAll();
      setNotes(notesData);
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
          const updated = await notesService.update(existingNote.id, {
            ...existingNote,
            important: newNotes.important,
          });

          setNotes((prev) => {
            return prev.map((note) => {
              return note.id === existingNote.id ? updated : note;
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
      const newNote = await notesService.create(newNotes);

      setNotes((prev) => {
        return [...prev, newNote];
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
        await notesService.remove(id);
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
