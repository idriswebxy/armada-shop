const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String
  },
  items: {
    type: Array
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);