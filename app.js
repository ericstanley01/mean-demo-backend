const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_ATLAS_USER +
      ":" +
      process.env.MONGO_ATLAS_PW +
      "@" +
      process.env.MONGO_ATLAS_SERVER +
      "/" +
      process.env.MONGO_ATLAS_DB +
      "?retryWrites=true",
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
