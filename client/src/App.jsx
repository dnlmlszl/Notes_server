import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const initialNotes = await noteService.getAll();
        setNotes(initialNotes);
      } catch (error) {
        console.error(error);
        setErrorMessage(`Error: ${error.response.data.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      important: false,
    };

    try {
      const addedNote = await noteService.create(noteObject);

      if (addedNote && addedNote.note.content) {
        setNotes((prevNotes) => prevNotes.concat(addedNote.note));
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`Error: ${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    setNewNote('');
  };

  function handleNoteChange(e) {
    setNewNote(e.target.value);
  }

  const toggleImportanceOf = async (id) => {
    const existingNote = notes.find((nt) => id === nt.id);
    const changedNote = { ...existingNote, important: !existingNote.important };
    try {
      const response = await noteService.update(id, changedNote);

      const returnedNote = response.updatedNote;
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id !== existingNote.id ? note : returnedNote
        )
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(`Error: ${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <main className="main">
      <h2>Notes</h2>
      <Notification message={errorMessage} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="showBtn" onClick={() => setShowAll((shw) => !shw)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {Array.isArray(notesToShow) &&
          notesToShow.map((note) => (
            <Note
              key={note.id}
              toggleImportance={() => toggleImportanceOf(note.id)}
              {...note}
            />
          ))}
      </ul>
      {/* <ul>
        {notes.map((note) => {
          return <Note key={note.id} {...note} />;
        })}
      </ul> */}
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button className="formBtn" type="submit">
          submit
        </button>
      </form>
      <Footer />
    </main>
  );
}

export default App;
