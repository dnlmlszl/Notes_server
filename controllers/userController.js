const bcrypt = require('bcrypt');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  });
  res.status(StatusCodes.OK).json(users);
};

const createUser = async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    res.status(StatusCodes.CREATED).json(savedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'something went wrong' });
    }
  }
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId).populate('notes');

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No user with ${userId}` });
  }

  res.status(StatusCodes.OK).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username } = req.body;

  if (req.userId !== id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Unauthorized to update other users' });
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, username },
    { new: true, runValidators: true, context: 'query' }
  );

  if (!updatedUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No user with ${id}` });
  }

  res.status(StatusCodes.OK).json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (req.userId !== id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Unauthorized to delete other users' });
  }

  const user = await User.findOne(id);

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No user with id ${id}` });
  }

  await user.deleteOne();

  res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
