require('dotenv').config();
const path = require('path');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const noteRouter = require('./routes/noteRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const errorHandlingMiddleware = require('./middleware/errorHandler');
const middleware = require('./utils/middlewares');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/v1/notes', noteRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(errorHandlingMiddleware);

module.exports = app;
