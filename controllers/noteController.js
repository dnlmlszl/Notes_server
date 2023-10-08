const Note = require('../models/Notes');
const { StatusCodes } = require('http-status-codes');

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.status(StatusCodes.OK).json({ notes, count: notes.length });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  const body = req.body;
  if (body.content === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Missing content' });
  }

  try {
    const note = await Note.create(req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    res.status(StatusCodes.CREATED).json({ note });
  } catch (error) {
    next(error);
  }
};

const getSingleNote = async (req, res, next) => {
  const { id: noteId } = req.params;
  try {
    const note = await Note.findOne({ _id: noteId });

    if (!note) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `No note with id ${noteId}` });
    }

    res.status(StatusCodes.OK).json({ note });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  const { id: noteId } = req.params;
  try {
    const note = await Note.findOne({ _id: noteId });

    if (!note) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `No note with id ${noteId}` });
    }

    await note.deleteOne();
    res
      .status(StatusCodes.OK)
      .json({ msg: 'Success! Note removed from database.' });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  const { id: noteId } = req.params;
  const { content, important } = req.body;

  if (content === undefined || important === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Content and/or important values are missing' });
  }

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId },
      { content, important },
      { new: true, runValidators: true, context: 'query' }
    );

    if (!updatedNote) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Note not found' });
    }

    res.status(StatusCodes.OK).json({ updatedNote });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  getSingleNote,
  deleteNote,
  updateNote,
};
