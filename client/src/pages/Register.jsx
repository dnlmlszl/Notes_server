import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NoteContext';

import userService from '../services/users';
import Button from '../components/Button';
import Loading from '../components/Loading';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const { loading, setLoading, setErrorMessage } = useNotes();

  const navigate = useNavigate();

  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setErrorMessage('Passwords do not match.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }
    setLoading(true);
    try {
      const newUser = {
        username: formData.username,
        name: formData.name,
        password: formData.password,
      };
      await userService.registerUser(newUser);

      setErrorMessage('User created!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error: ', error.response || error);
      setErrorMessage('Failed to register. Please try again.');
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setFormData({
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
      });
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="flex flex-col items-start justify-center bg-gray-100">
      <div className="p-6 mt-4 text-left bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-center font-bold text-3xl md:text-4xl text-[#34495e]  mt-4 mb-6 md:mb-10 tracking-wide leading-normal">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-500">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="px-6 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-500"
              disabled={
                !passwordsMatch ||
                !formData.username ||
                !formData.name ||
                !formData.password ||
                loading
              }
            >
              {loading ? 'I work' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
