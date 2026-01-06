import express from "express";
import mongoose from "mongoose";
import Deal from "../models/Deal.js";
import Lead from "../models/Lead.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE DEAL (manually or from lead conversion)
router.post("/", auth, async (req, res) => {
  try {
    const deal = await Deal.create({
      ...req.body,
      owner: req.userId,
    });
    res.status(201).json(deal);
  } catch (error) {
    res.status(500).json({ message: "Failed to create deal" });
  }
});

// CONVERT LEAD TO DEAL
router.post("/convert/:leadId", auth, async (req, res) => {
  try {
    // Find the lead
    const lead = await Lead.findOne({ _id: req.params.leadId, owner: req.userId });
    
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Create deal from lead data
    const deal = await Deal.create({
      title: `Deal - ${lead.name}`,
      amount: req.body.amount || 0,
      stage: "Open",
      leadId: lead._id,
      owner: req.userId,
    });

    // Update lead status to "Converted"
    lead.status = "Converted";
    await lead.save();

    res.status(201).json({ message: "Lead converted to deal", deal });
  } catch (error) {
    res.status(500).json({ message: "Failed to convert lead", error: error.message });
  }
});

// GET ALL DEALS (of logged-in user)
router.get("/", auth, async (req, res) => {
  try {
    const deals = await Deal.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch deals" });
  }
});

// UPDATE DEAL (stage, amount, etc.)
router.put("/:id", auth, async (req, res) => {
  try {
    const deal = await Deal.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true }
    );

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: "Failed to update deal" });
  }
});

// DELETE DEAL
router.delete("/:id", auth, async (req, res) => {
  try {
    await Deal.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    res.json({ message: "Deal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete deal" });
  }
});

// GET DASHBOARD STATS
router.get("/stats/dashboard", auth, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({ owner: req.userId });
    const totalDeals = await Deal.countDocuments({ owner: req.userId });
    
    const deals = await Deal.find({ owner: req.userId });
    // Only count revenue from "Won" deals
    const totalRevenue = deals
      .filter(deal => deal.stage === 'Won')
      .reduce((sum, deal) => sum + (deal.amount || 0), 0);
    
    const dealsByStage = await Deal.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(req.userId) } },
      { $group: { _id: "$stage", count: { $sum: 1 }, total: { $sum: "$amount" } } }
    ]);

    res.json({
      totalLeads,
      totalDeals,
      totalRevenue,
      dealsByStage,
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

export default router;