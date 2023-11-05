require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/connect');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      logger.info(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
