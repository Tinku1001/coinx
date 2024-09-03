const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const config = require('./config');

const transactionRoutes = require('./routes/Transactions');
const expenseRoutes = require('./routes/expense');
const { fetchEthereumPrice } = require('./services/coingeckoService');
const EthereumPrice = require('./models/ethereumPrice');


require('dotenv').config();

//connectDB();

const app = express();

//const PORT = process.env.PORT || 3000;

app.use(express.json());



//Connect to MongoDB

//Here I am not using the different componenet of connecting to the database

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));



// Use Routes
app.use('/api', transactionRoutes);
app.use('/api', expenseRoutes);

// Schedule a task to fetch Ethereum price every 10 minutes

cron.schedule('*/10 * * * *', async () => {
  try {
    const price = await fetchEthereumPrice();
    await EthereumPrice.create({ price, currency: 'INR' });
    console.log(`Ethereum price fetched : INR ${price}`);
  } catch (error) {
    console.error('Failed to fetch and store Ethereum price:', error);
  }
});

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
