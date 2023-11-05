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
      <h2 className="text-center font-bold text-3xl md:text-4xl text-[#34495e]  mt-4 mb-6 md:mb-10 tracking-wide leading-normal">
        Your Personal Notes
      </h2>

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
