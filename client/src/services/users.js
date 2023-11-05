import axios from 'axios';
const baseUrl = '/api/v1/users';
let token = null;

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null;
};

axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getUsers = async () => {
  const config = token ? { headers: { Authorization: token } } : {};
  const response = await axios(baseUrl, config);

  return response;
};

const getUser = async (id) => {
  const config = token ? { headers: { Authorization: token } } : {};

  const response = await axios(`${baseUrl}/${id}`, config);

  return response;
};

const updateUser = async (id, updateObj) => {
  const config = token ? { headers: { Authorization: token } } : {};

  try {
    const response = await axios.put(`${baseUrl}/${id}`, updateObj, config);
    return response;
  } catch (error) {
    console.error('Error updating a user: ', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  const config = token ? { headers: { Authorization: token } } : {};

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response;
  } catch (error) {
    console.error('Error deleting user: ', error);
    throw error;
  }
};

const registerUser = async (newObj) => {
  try {
    const response = await axios.post(`${baseUrl}`, newObj);

    return response;
  } catch (error) {
    console.error('Error creating a user: ', error);
    throw error;
  }
};

export default {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  registerUser,
  setToken,
};
