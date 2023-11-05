import { useNotes } from '../context/NoteContext';
import { BsCheckAll } from 'react-icons/bs';
import { BsX } from 'react-icons/bs';
import Button from './Button';
import Loading from './Loading';

const Note = ({ id, content, important, toggleImportance }) => {
  const { deleteNote, loading } = useNotes();

  if (loading) return <Loading />;

  return (
    <li className="bg-white p-8 md:p-4 shadow-md mt-2 grid grid-cols-2 md:grid-cols-[auto_100px_100px] items-center gap-8 md:gap-6 rounded-sm note w-full">
      <p className="text-gray-700 col-span-2 md:col-span-1">{content}</p>

      <div
        className="cursor-pointer relative w-24 md:w-full p-1 rounded-full transition-colors duration-300 shadow-lg justify-self-start md:justify-self-end"
        onClick={() => toggleImportance()}
      >
        <input
          type="checkbox"
          name="toggle"
          id={id}
          checked={important}
          onChange={toggleImportance}
          className="hidden"
        />
        <div
          className={`block w-8 h-6 bg-white rounded-full shadow-inner transform transition-transform duration-300 ${
            important ? 'translate-x-10' : 'translate-x-0'
          }`}
        ></div>

        <div
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            important ? 'left-1.5' : 'right-1.5'
          } w-10 h-4 rounded-full transition-colors duration-300 ${
            important ? 'bg-green-400' : 'bg-red-400'
          }`}
        ></div>
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            important ? 'left-2' : 'right-2'
          } w-9 h-3 ${important ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
        ></div>
        <div
          className={`absolute top-0 left-0 w-12 h-6 rounded-full bg-white transform transition-transform duration-300 ${
            important ? 'translate-x-12' : 'translate-x-0'
          }`}
        ></div>
        <div
          className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
            important ? 'text-gray-600 opacity-0' : 'text-gray-600 opacity-100'
          } transition-opacity duration-300`}
        >
          <BsX color="red" />
        </div>
        <div
          className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
            important ? 'text-gray-600 opacity-100' : 'text-gray-600 opacity-0'
          } transition-opacity duration-300`}
        >
          <BsCheckAll color="green" />
        </div>
      </div>

      <Button
        className="w-[100px] border border-red-500 text-red-500 rounded-md tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 justify-self-end"
        onClick={() => deleteNote(id)}
        disabled={loading}
      >
        {loading ? 'Deleting' : 'Remove'}
      </Button>
    </li>
  );
};

export default Note;
