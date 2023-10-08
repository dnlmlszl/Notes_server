const express = require('express');
const router = express.Router();

const {
  getNotes,
  createNote,
  getSingleNote,
  deleteNote,
  updateNote,
} = require('../controllers/noteController');

router.route('/').post(createNote).get(getNotes);

router.route('/:id').get(getSingleNote).put(updateNote).delete(deleteNote);

module.exports = router;
