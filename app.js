require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const noteRouter = require('./routes/noteRouter');
const errorHandlingMiddleware = require('./middleware/errorHandler');
const middleware = require('./middleware/middlewares');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/v1/notes', noteRouter);

app.use(middleware.unknownEndpoint);
app.use(errorHandlingMiddleware);

module.exports = app;
