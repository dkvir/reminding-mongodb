const mongoose = require("mongoose");

const collaboratorsSchema = new mongoose.Schema({
  name: String,
  position: String,
  salary: String,
});

const worksSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: String,
  services: [String],
  days: Number,
  collaborators: collaboratorsSchema,
  pinned: Boolean,
});

module.exports = mongoose.model("works", worksSchema);
