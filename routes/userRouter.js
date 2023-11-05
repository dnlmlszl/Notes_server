const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const userExtractor = require('../utils/userExtractor');

router.route('/').get(userExtractor, getAllUsers).post(createUser);
router
  .route('/:id')
  .get(userExtractor, getSingleUser)
  .put(userExtractor, updateUser)
  .delete(userExtractor, deleteUser);

module.exports = router;
