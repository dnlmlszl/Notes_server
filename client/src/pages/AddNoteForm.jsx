import { useState } from 'react';
import noteService from '../services/notes';
import Button from '../components/Button';
import { useNotes } from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const AddNoteForm = () => {
  const { setNotes, setErrorMessage, setLoading, loading } = useNotes();

  const [newNote, setNewNote] = useState('');

  const navigate = useNavigate();

  const addNote = async (e) => {
    e.preventDefault();
    setLoading(true);

    const noteObject = {
      content: newNote,
      important: false,
    };

    try {
      const addedNote = await noteService.create(noteObject);

      if (addedNote && addedNote.content) {
        setNotes((prevNotes) => prevNotes.concat(addedNote));
        navigate('/notes');
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`Error: ${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setNewNote('');
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={addNote}
      className="flex flex-col justify-between mx-auto my-8 p-6 max-w-md md:max-w-2xl md:h-[25rem] w-full h-full bg-white shadow-md rounded-md"
    >
      <h2 className="text-center font-bold text-3xl md:text-4xl text-[#34495e]  mt-4 mb-6 md:mb-10 tracking-wide leading-normal">
        Add Your Notes
      </h2>
      <div className="mb-4 md:mb-8">
        <input
          type="text"
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          id="note-input"
          placeholder="Add a note"
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <Button
        className="bg-gray-700 text-white border font-bold tracking-wider border-gray-500 hover:bg-gray-600 rounded-md mb-8"
        type="submit"
        disabled={loading}
      >
        {loading ? 'I work' : 'Submit'}
      </Button>
    </form>
  );
};

export default AddNoteForm;
