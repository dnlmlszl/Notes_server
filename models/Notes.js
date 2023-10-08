const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minLength: 5,
      required: true,
    },
    important: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);
