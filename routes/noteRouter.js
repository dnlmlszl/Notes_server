const express = require('express');
const router = express.Router();

const {
  getNotes,
  createNote,
  getSingleNote,
  deleteNote,
  updateNote,
} = require('../controllers/noteController');
const userExtractor = require('../utils/userExtractor');

router.route('/').post(userExtractor, createNote).get(userExtractor, getNotes);

router
  .route('/:id')
  .get(userExtractor, getSingleNote)
  .put(userExtractor, updateNote)
  .delete(userExtractor, deleteNote);

module.exports = router;
