const Note = require('../models/Notes');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.userId }).populate('user', {
    username: 1,
    name: 1,
  });
  res.status(StatusCodes.OK).json({ notes, count: notes.length });
};

const createNote = async (req, res) => {
  const { content, important = false } = req.body;

  if (!content) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Missing content or user' });
  }

  const user = await User.findById(req.userId);
  // const user = await User.findById(userId);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'user not found' });
  }

  const note = new Note({
    content: content,
    important: important === undefined ? false : important,
    user: user.id,
  });

  const savedNote = await note.save();

  user.notes = user.notes.concat(savedNote.id);
  await user.save();

  res.status(StatusCodes.CREATED).json(savedNote);
};

const getSingleNote = async (req, res) => {
  const { id: noteId } = req.params;
  const note = await Note.findOne({ _id: noteId });

  if (!note) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No note with id ${noteId}` });
  }

  res.status(StatusCodes.OK).json({ note });
};

const deleteNote = async (req, res) => {
  const { id: noteId } = req.params;
  const userId = req.userId;

  const note = await Note.findOne({ _id: noteId, user: userId });

  if (!note) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No note with id ${noteId}` });
  }

  await note.deleteOne();

  await User.updateOne({ _id: userId }, { $pull: { notes: noteId } });

  res
    .status(StatusCodes.NO_CONTENT)
    .json({ msg: 'Success! Note removed from database.' });
};

const updateNote = async (req, res) => {
  const { id: noteId } = req.params;
  const { content, important } = req.body;
  const userId = req.userId;

  if (content === undefined || important === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Content and/or important values are missing' });
  }

  const note = await Note.findOne({ _id: noteId, user: userId });

  if (!note) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Note not found' });
  }

  note.content = content;
  note.important = important;

  const updatedNote = await note.save();

  res.status(StatusCodes.OK).json({ note: updatedNote });
};

module.exports = {
  getNotes,
  createNote,
  getSingleNote,
  deleteNote,
  updateNote,
};
