const express = require('express');
const router = express.Router();

router.post('/donate', async (req, res) => {
  try {
    const { fundingCollection } = req.app.locals; 
    const donationData = req.body; 
    
    const result = await fundingCollection.insertOne(donationData);
    res.status(201).send({ success: true, message: "Donation recorded successfully", result });
  } catch (error) {
    console.error("Error creating donation record:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { fundingCollection } = req.app.locals;
    
    const result = await fundingCollection.find().sort({ date: -1 }).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error fetching funding history:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const { fundingCollection } = req.app.locals;
    
    const stats = await fundingCollection.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalDonors: { $sum: 1 }
        }
      }
    ]).toArray();
    
    if (stats.length > 0) {
      res.send({
        totalAmount: stats[0].totalAmount,
        totalDonors: stats[0].totalDonors
      });
    } else {
      res.send({ totalAmount: 0, totalDonors: 0 });
    }
  } catch (error) {
    console.error("Error fetching funding stats:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

module.exports = router;