const express = require('express');
const router = express.Router();

const { Book, validate } = require('../../models/Books');
const validateId = require('../../utils/validateObjectId');

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
        .json({ message: 'A book with that title already exist.' });
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

//GET book by :id
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err =>
      res.status(404).json({ message: 'No book found with that Id.' })
    );
});

//GET all books
router.get('/', (req, res) => {
  Book.find()
    .select('-__v')
    .then(books => {
      if (!books) {
        res.status(404).json({ message: 'No books found' });
      }
      res.json(books);
    })
    .catch(err => res.status(404).json({ message: 'No books available' }));
});

// DELETE book
router.delete('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      book.remove().then(() => res.json({ message: 'Successfully deleted.' }));
    })
    .catch(err =>
      res.status(404).json({ message: 'No book found with that Id.' })
    );
});

//Update book
router.put('/:id', validateId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).json({ message: 'No book found with that Id.' });

  const fields = {
    publicationYear: req.body.publicationYear || book.publicationYear,
    pages: req.body.pages || book.pages
  };
  book = await Book.findOneAndUpdate({ _id: req.params.id }, fields, {
    new: true
  });

  res.json(book);
});

module.exports = router;
