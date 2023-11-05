import axios from 'axios';
const baseUrl = '/api/v1/notes';
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

const getAll = async () => {
  const config = token
    ? {
        headers: { Authorization: token },
      }
    : {};

  try {
    const response = await axios.get(baseUrl, config);
    return response.data.notes;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

const create = async (newObject) => {
  const config = token
    ? {
        headers: { Authorization: token },
      }
    : {};

  try {
    const response = await axios.post(baseUrl, newObject, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error creating a note: ', error);
    throw error;
  }
};

const update = async (id, newObject) => {
  const config = token
    ? {
        headers: { Authorization: token },
      }
    : {};

  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
  } catch (error) {
    console.error('Error updating a note: ', error);
    throw error;
  }
};

const remove = async (id) => {
  const config = token
    ? {
        headers: { Authorization: token },
      }
    : {};

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting a note: ', error);
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  setToken,
  remove,
};
