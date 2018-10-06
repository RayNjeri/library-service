const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('DB connected'))
  .catch(err => console.log('err', err));

const port = process.env.port || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));
