const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  params: {
    type: String,
    default: "",
  },
=======
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
  is_active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Settings", settingsSchema);
