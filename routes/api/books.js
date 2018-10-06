const express = require('express');
const router = express.Router();

const { Book, validate } = require('../../models/Books');

//create a new book
router.post('/register', (req, res) => {
  // Input validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find if a book with that title already exists.
  Book.findOne({ title: req.body.title }).then(book => {
    if (book) {
      return res
        .status(400)
        .json({ message: 'A book with that title already exist' });
    }
    // else create a new book
    else {
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear,
        pages: req.body.pages
      });
      newBook
        .save()
        .then(book => res.json(book))
        .catch(err => console.log('error'));
    }
  });
});

module.exports = router;
