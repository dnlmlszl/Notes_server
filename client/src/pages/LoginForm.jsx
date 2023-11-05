import { useState } from 'react';
import Button from '../components/Button';
import loginService from '../services/login';
import noteService from '../services/notes';
import { useUser } from '../context/UserContext';
import { useNotes } from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { setUser } = useUser();
  const { setErrorMessage, setLoading, loading } = useNotes();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (error) {
      setErrorMessage('Wrong credentials');
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="mx-auto my-8 p-6 max-w-md bg-white shadow-md rounded-md"
    >
      <h2 className="text-center text-2xl text-gray-900 mt-3 mb-3">Login</h2>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          username
        </label>

        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          username
        </label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <Button
        type="submit"
        className="bg-gray-700 text-white border font-bold tracking-wider border-gray-500 hover:bg-gray-600 rounded-md"
        disabled={loading}
      >
        {loading ? 'I work' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;
