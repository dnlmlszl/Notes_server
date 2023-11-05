import { useNotes } from '../context/NoteContext';
import Note from '../components/Note';
import Loading from '../components/Loading';

const NoteList = () => {
  const { notes, toggleImportanceOf, loading, showAll } = useNotes();

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  if (loading) return <Loading />;

  return (
    <section className="p-6 sm:p-12 mb-4 w-[70%] flex-grow mx-auto max-w-5xl">
      <ul>
        {Array.isArray(notes) &&
          notesToShow.map((note) => (
            <Note
              key={note.id}
              toggleImportance={() => toggleImportanceOf(note.id)}
              {...note}
            />
          ))}
      </ul>
    </section>
  );
};

export default NoteList;
