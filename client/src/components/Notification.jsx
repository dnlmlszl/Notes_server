import { useNotes } from '../context/NoteContext';

const Notification = () => {
  const { errorMessage } = useNotes();

  if (errorMessage === null) return null;
  return (
    <div className="bg-red-400 text-white p-4 rounded-md shadow-md">
      {errorMessage}
    </div>
  );
};

export default Notification;
