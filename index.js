require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/connect');
const logger = require('./middleware/logger');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      logger.info(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
