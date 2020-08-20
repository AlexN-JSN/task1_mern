const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const setsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    required: true,
  },
  raiting: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Sets", setsSchema);
