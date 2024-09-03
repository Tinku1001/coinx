
require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  PORT: process.env.PORT || 3000
};

