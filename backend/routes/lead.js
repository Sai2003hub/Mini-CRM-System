import express from "express";
import Lead from "../models/Lead.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE LEAD
router.post("/", auth, async (req, res) => {
  try {
    console.log("Creating lead with data:", req.body);
    console.log("User ID from token:", req.userId);
    
    const lead = await Lead.create({
      ...req.body,
      owner: req.userId,
    });
    
    console.log("Lead created successfully:", lead);
    res.status(201).json(lead);
  } catch (error) {
    console.error("Error creating lead:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ message: "Failed to create lead", error: error.message });
  }
});

// GET ALL LEADS (of logged-in user)
router.get("/", auth, async (req, res) => {
  try {
    console.log("Fetching leads for user:", req.userId);
    const leads = await Lead.find({ owner: req.userId }).sort({ createdAt: -1 });
    console.log("Found leads:", leads.length);
    res.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error.message);
    res.status(500).json({ message: "Failed to fetch leads", error: error.message });
  }
});

// UPDATE LEAD (status, phone, etc.)
router.put("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    console.error("Error updating lead:", error.message);
    res.status(500).json({ message: "Failed to update lead", error: error.message });
  }
});

// DELETE LEAD
router.delete("/:id", auth, async (req, res) => {
  try {
    await Lead.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    res.json({ message: "Lead deleted" });
  } catch (error) {
    console.error("Error deleting lead:", error.message);
    res.status(500).json({ message: "Failed to delete lead", error: error.message });
  }
});

export default router;