import { useEffect, useState } from 'react';
import Button from '../components/Button';
import loginService from '../services/login';
import noteService from '../services/notes';
import { useUser } from '../context/UserContext';
import { useNotes } from '../context/NoteContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { setUser } = useUser();
  const { setErrorMessage, setLoading, loading } = useNotes();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = window.localStorage.getItem('username');
    const savedPassword = window.localStorage.getItem('password');
    const isRemembered = window.localStorage.getItem('rememberMe') === 'true';

    if (isRemembered && savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(isRemembered);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);

      if (rememberMe) {
        window.localStorage.setItem('rememberMe', 'true');
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
      } else {
        window.localStorage.removeItem('rememberMe');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }

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
      className="mx-auto my-8 p-6 max-w-lg w-full bg-white shadow-md rounded-md"
    >
      <h2 className="text-center font-bold text-3xl md:text-4xl text-[#34495e]  mt-4 mb-6 md:mb-10 tracking-wide leading-normal">
        Login
      </h2>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 capitalize"
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
          className="block text-sm font-medium text-gray-700 capitalize"
        >
          password
        </label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="flex items-center justify-between my-4">
        <label htmlFor="remember-me" className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={({ target }) => setRememberMe(target.checked)}
            className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
            style={{ accentColor: '#4CAF50' }}
          />
          <span className="ml-2 block text-sm text-gray-900">Remember me</span>
        </label>
      </div>

      <Button
        type="submit"
        className="bg-gray-700 text-white border font-bold tracking-wider border-gray-500 hover:bg-gray-600 rounded-md"
        disabled={loading}
      >
        {loading ? 'I work' : 'Login'}
      </Button>

      <div className="text-center mt-8">
        <p className="text-sm">
          Not a member yet?{' '}
          <Link
            to="/register"
            className="text-gray-700 hover:text-gray-500 ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
