import { createContext, useContext, useEffect, useState } from 'react';
import noteService from '../services/notes';
import { useUser } from './UserContext';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [isFishAndChipsOpen, setIsFishAndChipsOpen] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const checkScreenSize = () => {
      const isMd = window.innerWidth >= 768;

      if (isMd) {
        setIsFishAndChipsOpen(false);
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const initialNotes = await noteService.getAll();
        setNotes(initialNotes);
      } catch (error) {
        console.error(error);
        setErrorMessage(`Error: ${error.response.data.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [user]);

  const toggleImportanceOf = async (id) => {
    const existingNote = notes.find((nt) => id === nt.id);
    const changedNote = { ...existingNote, important: !existingNote.important };
    try {
      const response = await noteService.update(id, changedNote);

      const returnedNote = response.note;
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

  const deleteNote = async (id) => {
    try {
      await noteService.remove(id);

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setErrorMessage(`Note successfully removed`);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Error: ${error.response.data.error}`);
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        errorMessage,
        setErrorMessage,
        toggleImportanceOf,
        deleteNote,
        loading,
        setLoading,
        showAll,
        setShowAll,
        isFishAndChipsOpen,
        setIsFishAndChipsOpen,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === null) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};
