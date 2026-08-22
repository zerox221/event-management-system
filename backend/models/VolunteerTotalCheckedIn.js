const mongoose = require("mongoose");

const totalCheckedInSchema = new mongoose.Schema({
  event : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "event"
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});


module.exports = mongoose.model("totalCheckedIn",totalCheckedInSchema);