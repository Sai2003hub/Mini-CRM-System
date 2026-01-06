import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    stage: {
      type: String,
      default: "Open",
      enum: ["Open", "Proposal", "Negotiation", "Won", "Lost"]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
  },
  { timestamps: true }
);

// Check if model exists before creating
const Deal = mongoose.models.Deal || mongoose.model("Deal", dealSchema);

export default Deal;