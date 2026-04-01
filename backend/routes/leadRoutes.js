const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const authMiddleware = require("../middleware/authMiddleware");


// Get all leads
router.get("/", authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads" });
  }
});


// Add lead
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("Lead data:", req.body);

    const newLead = new Lead(req.body);
    await newLead.save();

    console.log("Lead saved");

    res.json(newLead);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving lead" });
  }
});


// Update lead
router.put("/:id", authMiddleware, async (req, res) => {
  try {

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedLead);

  } catch (error) {
    res.status(500).json({ message: "Error updating lead" });
  }
});


// Delete lead
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Lead.findByIdAndDelete(req.params.id);

    res.json({ message: "Lead deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting lead" });
  }
});

module.exports = router;