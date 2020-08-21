const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: {
    type: [{ type: Schema.Types.ObjectId }],
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  raiting: {
    type: Number,
    default: 0,
  },
  sets: {
    type: Array,
    default: [],
  },
  cards: {
    type: Array,
    default: [],
  },
<<<<<<< HEAD
  blocked_cards: {
    type: Array,
    default: [],
  },
=======
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Users", usersSchema);
