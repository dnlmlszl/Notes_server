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

NoteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', NoteSchema);
