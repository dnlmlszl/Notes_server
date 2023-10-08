require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');

const connectDB = require('./db/connect');
const errorHandlingMiddleware = require('./middleware/errorHandler');

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/api/v1', (req, res) => {
  res.send(`<h1>Hello world</h1>`);
});

const noteRouter = require('./routes/noteRouter');

app.use('/api/v1/notes', noteRouter);
app.use(errorHandlingMiddleware);

app.use(unknownEndpoint);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
