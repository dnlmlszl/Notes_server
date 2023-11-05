import { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import AddNoteForm from './components/AddNoteForm';
import Togglable from './components/Togglable';

function App() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    noteService.setToken(null);
    setUser(null);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <main className="main">
      <Notification message={errorMessage} />
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <h2>Notes</h2>

      <Togglable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Togglable>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="showBtn" onClick={() => setShowAll((shw) => !shw)}>
            Show {showAll ? 'Important' : 'All'}
          </button>
        </div>
        <Togglable buttonLabel="new note" ref={noteFormRef}>
          <AddNoteForm
            setErrorMessage={setErrorMessage}
            setNotes={setNotes}
            noteFormRef={noteFormRef}
          />
        </Togglable>
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
      </div>

      <Footer />
    </main>
  );
}

export default App;
