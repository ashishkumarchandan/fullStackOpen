// src/App.jsx
import React, { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import Note from './components/Note'

const App = () => {
  // data state
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // auth + UI state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // load notes once
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const initialNotes = await noteService.getAll()
        setNotes(initialNotes)
      } catch (err) {
        setErrorMessage('Failed to fetch notes')
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
    fetchNotes()
  }, [])

  // helper: notes to show
  const notesToShow = showAll ? notes : notes.filter(n => n.important)

  // login handler
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      // set token for noteService so create will include Authorization header
      noteService.setToken(loggedUser.token)

      setUser(loggedUser)
      setUsername('')
      setPassword('')
      setErrorMessage(null)
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  // adding note (requires logged in user)
  const addNote = async (event) => {
    event.preventDefault()
    try {
      const created = await noteService.create({
        content: newNote,
        important: Math.random() > 0.5
      })
      setNotes(notes.concat(created))
      setNewNote('')
    } catch (err) {
      setErrorMessage('Failed to create note (maybe not logged in)')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = async (id) => {
    try {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
      const returnedNote = await noteService.update(id, changedNote)
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    } catch (err) {
      setErrorMessage('Note update failed')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App
