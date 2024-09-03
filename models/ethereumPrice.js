const mongoose = require('mongoose');

const ethereumPriceSchema = new mongoose.Schema({
  price: Number,
  currency: String,
  fetchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EthereumPrice', ethereumPriceSchema);
