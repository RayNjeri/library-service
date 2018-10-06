const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publicationYear: {
    type: Number,
    required: true
  },
  pages: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  availability: {
    type: Boolean,
    default: true
  },
  borrowedDate: {
    type: Date
  },
  dueDate: {
    type: Date
  }
});

module.exports = Book = mongoose.model('books', BooksSchema);
