import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import userService from '../services/users';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useNotes } from '../context/NoteContext';
import { useUser } from '../context/UserContext';

const User = () => {
  const [displayUser, setDisplayUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const { id } = useParams();

  const { setErrorMessage } = useNotes();
  const { handleLogout, user } = useUser();

  const navigate = useNavigate();

  const userMatch = user.id === id;

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const user = await userService.getUser(id);
        setDisplayUser(user.data);
        setNewName(user.data.name);
        setNewUsername(user.data.username);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [setLoading, id]);

  const updateUser = async (id) => {
    setLoading(true);
    if (!userMatch) {
      setErrorMessage('Error: You can only edit your own profile.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }
    try {
      const updatedUser = await userService.updateUser(id, {
        name: newName,
        username: newUsername,
      });
      setDisplayUser(updatedUser.data);
      setIsEditing(false);

      setErrorMessage(`Success: user updated successfully!`);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Error: ${error.response.data.error}`);
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNewName('');
      setNewUsername('');
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    if (!userMatch) {
      setErrorMessage('Error: You can only delete your own profile.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmDelete) {
      setLoading(true);
      try {
        await userService.deleteUser(id);
        handleLogout();

        navigate('/');
        setErrorMessage(`User successfully removed!`);
      } catch (error) {
        console.error(error);
        setErrorMessage(`Error: ${error.response.data.error}`);
      } finally {
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setLoading(false);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <article className="p-4 bg-white rounded-lg shadow-md my-4 md:my-8 w-1/2 md:w-3/4">
      <div className="flex justify-between items-center">
        <h2 className="text-center font-bold text-3xl md:text-4xl text-[#34495e]  mt-4 mb-6 md:mb-10 tracking-wide leading-normal">
          User Details
        </h2>
        {userMatch && !isEditing && (
          <FaEdit
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-yellow-500 hover:text-yellow-400"
            size="1.5em"
          />
        )}
      </div>

      {isEditing ? (
        <>
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Username:</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded w-full"
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Name:</h3>
            <p className="ml-4 text-gray-600">{displayUser?.username}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Username:</h3>
            <p className="ml-4 text-gray-600">{displayUser?.name}</p>
          </div>
        </>
      )}

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">No. of notes:</h3>
        <p className="ml-4 text-gray-600">
          {displayUser?.notes ? displayUser?.notes?.length : 0}
        </p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={() => (isEditing ? setIsEditing(false) : navigate(-1))}
          className="text-blue-600 hover:underline"
        >
          Back...
        </Button>

        {isEditing ? (
          <Button
            className="px-4 py-2 mr-2 border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white rounded transition duration-150 ease-in-out"
            onClick={() => updateUser(id)}
            disabled={loading}
          >
            {loading ? 'I work' : 'Edit'}
          </Button>
        ) : (
          <Button
            className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition duration-150 ease-in-out"
            onClick={() => removeUser(id)}
            disabled={loading}
          >
            {loading ? 'I work' : 'Delete'}
          </Button>
        )}
      </div>
    </article>
  );
};

export default User;
