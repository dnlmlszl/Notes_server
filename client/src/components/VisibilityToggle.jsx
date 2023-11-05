import { useNotes } from '../context/NoteContext';
import Button from './Button';

const VisibilityToggle = () => {
  const { showAll, setShowAll } = useNotes();
  return (
    <Button
      onClick={() => setShowAll(!showAll)}
      className=" bg-yellow-600 text-grey-700 rounded capitalize hover:bg-yellow-700 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 py-0"
    >
      {showAll ? 'Important' : 'All'}
    </Button>
  );
};

export default VisibilityToggle;
