const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionsSchema = new Schema({
  card_d: {
    type: Number,
    required: true,
  },
  price_start: {
    type: Number,
    required: true,
  },
  min_bet_step: {
    type: Number,
    required: true,
  },
  max_bet: {
    type: Number,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  duration_auction: {
    type: Number,
    required: true,
  },
  min_extension_time: {
    type: Number,
    required: true,
  },
  max_duration_auction: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  owner_id: {
    type: Number,
    required: true,
  },
  buyer_id: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Auctions", auctionsSchema);
