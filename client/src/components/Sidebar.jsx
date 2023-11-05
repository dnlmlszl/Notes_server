import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useNotes } from '../context/NoteContext';

const Sidebar = ({ closeSidebar }) => {
  const { user } = useUser();
  const { isFishAndChipsOpen } = useNotes();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white border-b-2 border-yellow-500 px-3 py-2 rounded transition'
      : 'text-white hover:text-yellow-500 px-3 py-2 rounded transition';
  return (
    <aside
      className={`${
        isFishAndChipsOpen ? 'block' : 'hidden'
      } flex flex-col items-start justify-start fixed top-[4.5rem] left-0 ${
        user ? 'h-1/4' : 'h-1/5'
      } bg-gray-800 bg-opacity-70 backdrop-blur-md  p-4 pt-5 z-10 lg:hidden`}
    >
      <NavLink to="/" className={linkClass} onClick={closeSidebar}>
        Home
      </NavLink>
      {!user && (
        <NavLink to="/login" className={linkClass} onClick={closeSidebar}>
          Login
        </NavLink>
      )}
      {!user && (
        <NavLink to="/register" className={linkClass} onClick={closeSidebar}>
          Register
        </NavLink>
      )}
      {user && (
        <NavLink to="/notes" className={linkClass} onClick={closeSidebar}>
          Notes
        </NavLink>
      )}
      {user && (
        <NavLink to="/addNote" className={linkClass} onClick={closeSidebar}>
          Add Notes
        </NavLink>
      )}
      {user && (
        <NavLink to="/users" className={linkClass} onClick={closeSidebar}>
          Users
        </NavLink>
      )}
    </aside>
  );
};

export default Sidebar;
