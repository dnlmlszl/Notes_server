import { useNotes } from '../context/NoteContext';
import { useUser } from '../context/UserContext';
import Button from './Button';

const UserStatus = () => {
  const { handleLogout, user } = useUser();
  const { setNotes } = useNotes();

  const logout = () => {
    handleLogout();
    setNotes();
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-between px-4 py-0">
      <p className="mr-4 py-0">
        Hello,{' '}
        <span className="capitalize text-yellow-600 text-md font-bold tracking-widest">
          {user?.username}
        </span>
      </p>
      <Button onClick={logout} className="py-0"> 
        Logout
      </Button>
    </div>
  );
};

export default UserStatus;
