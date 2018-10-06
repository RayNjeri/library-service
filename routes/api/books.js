const express = require('express');
const router = express.Router();

const Book = require('../../models/Books');

//create a new book
router.post('/register', (req, res) => {
  Book.findOne({ title: req.body.title }).then(book => {
    if (book) {
      return res
        .status(400)
        .json({ message: 'A book with that title already exist' });
    } else {
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
