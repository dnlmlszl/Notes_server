import { NavLink, useLocation } from 'react-router-dom';

import { useUser } from '../context/UserContext';
import { useNotes } from '../context/NoteContext';

import UserStatus from './UserStatus';
import VisibilityToggle from './VisibilityToggle';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { user } = useUser();
  const { isFishAndChipsOpen, setIsFishAndChipsOpen } = useNotes();

  const location = useLocation();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white border-b-2 border-yellow-500 px-3 py-2 rounded transition'
      : 'text-white hover:text-yellow-500 px-3 py-2 rounded transition';

  return (
    <nav className="flex items-center bg-gray-800 text-white justify-between px-3 py-3 md:p-6 w-full relative">
      <button
        onClick={() => setIsFishAndChipsOpen(!isFishAndChipsOpen)}
        className="md:hidden p-2 text-white z-20 flex items-center"
      >
        <span className="sr-only">Open menu</span>
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <div className="flex items-center my-4 gap-4 md:hidden">
        {location.pathname === '/notes' && <VisibilityToggle />}
        {user && <UserStatus />}
      </div>
      {isFishAndChipsOpen && (
        <Sidebar
          isOpen={isFishAndChipsOpen}
          closeSidebar={() => setIsFishAndChipsOpen(false)}
          user={user}
        />
      )}
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-1 rounded-lg items-center justify-between w-full hidden md:flex">
        <div className="flex-grow ml-6 py-3 gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          {!user && (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          )}
          <NavLink to="/notes" className={linkClass}>
            Notes
          </NavLink>
          <NavLink to="/addNote" className={linkClass}>
            Add Notes
          </NavLink>
          <NavLink to="/users" className={linkClass}>
            Users
          </NavLink>
        </div>
        <div className="flex items-center my-0 gap-x-4">
          {location.pathname === '/notes' && <VisibilityToggle />}
          {user && <UserStatus />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
