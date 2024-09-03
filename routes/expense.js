const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const EthereumPrice = require("../models/ethereumPrice");

router.get("/get-expenses", async (req, res) => {
  const { address } = req.body;

  try {
    // Fetch transactions from the database

    const transactions = await Transaction.find({ address });

    // Calculate total expenses
    let totalExpenses = transactions.reduce((acc, tx) => {
      let gasUsed = parseFloat(tx.gasUsed.toString());
      let gasPrice = parseFloat(tx.gasPrice.toString());
      let expense = (gasUsed * gasPrice) / 1e18;

      return acc + expense;
    }, 0);

    // Fetch the latest Ethereum price from the database
    const ethereumPrice = await EthereumPrice.findOne().sort({ fetchedAt: -1 });
    if (!ethereumPrice) {
      return res.status(404).json({ error: "Ethereum price not found." });
    }

    return res
      .status(200)
      .json({ totalExpenses, currentEthereumPrice: ethereumPrice.price });
  } catch (error) {
    console.error("Error calculating expenses:", error);

    return res.status(500).json({ error: "Failed to calculate expenses." });
  }
});

module.exports = router;
