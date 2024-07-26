const env = require("dotenv");
env.config();

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    QUEUE_NAME: process.env.QUEUE_NAME,
  };