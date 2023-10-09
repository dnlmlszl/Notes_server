import axios from 'axios';
const baseUrl = '/api/v1/notes';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.notes;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    console.error('Error creating person: ', error);
    throw error;
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error('Error updating person: ', error);
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
};
