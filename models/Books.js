const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const Book = mongoose.model(
  'books',
  new Schema({
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 150
    },
    author: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50
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
    },
    returnDate: {
      type: Date
    }
  })
);

function bookValidation(bookDescription) {
  const schema = {
    title: Joi.string()
      .max(150)
      .min(5)
      .required(),
    author: Joi.string()
      .max(50)
      .min(5)
      .required(),
    publicationYear: Joi.number()
      .required()
      .greater(0)
      .max(new Date().getFullYear()),
    pages: Joi.number()
      .required()
      .greater(0),
    borrowedDate: Joi.date().max(new Date()),
    returnDate: Joi.date().max(new Date())
  };

  return Joi.validate(bookDescription, schema);
}
exports.Book = Book;
exports.validate = bookValidation;
