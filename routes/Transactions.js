const express = require("express");
const router = express.Router();
const { fetchTransactions } = require("../services/etherscanService");
const Transaction = require("../models/Transaction");

router.post("/fetch-transactions", async (req, res) => {
  const { address } = req.body;

  try {
    const transactions = await fetchTransactions(address);

    // Save transactions to the database
    const savedTransactions = await Transaction.insertMany(
      transactions.map((tx) => ({
        ...tx,
        address,

        // Ensure the they stores as String
        gasPrice: tx.gasPrice.toString(),
        gasUsed: tx.gasUsed.toString(),
      }))
    );

    return res.status(200).json(savedTransactions);
  } catch (error) {
    console.error("Error fetching/saving transactions:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch or save transactions." });
  }
});

module.exports = router;
