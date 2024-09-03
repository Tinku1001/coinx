const axios = require('axios');

const API_KEY = process.env.ETHERSCAN_API_KEY;
const BASE_URL = 'https://api.etherscan.io/api';



async function fetchTransactions(address) {
  const url = `${BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`;
  const response = await axios.get(url);

  console.log(`response : ${response}`);
  return response.data.result;
}

module.exports = { fetchTransactions };
