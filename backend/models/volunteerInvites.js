const mongoose = require("mongoose");

const volunteerInvitesSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  token: {
    type: String,
    required: true,
  },
  maxVolunteers: {
    type: Number,
    required: true,
  },
  joinedCount: {
    type: Number,
    required: true,
    default: 0,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

volunteerInvitesSchema.index(
    {expiresAt : 1},
    {expireAfterSeconds : 1},
)

module.exports = mongoose.model("volunteerInvitation",volunteerInvitesSchema);
