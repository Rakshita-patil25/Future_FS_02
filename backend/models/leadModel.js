const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  source: String,
  status: { type: String, default: "New" },
  followUp: { type: String, default: "" }  
});

module.exports = mongoose.model("Lead", LeadSchema);