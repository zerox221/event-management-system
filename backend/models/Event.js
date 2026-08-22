const mongoose = require("mongoose");
const volunteer = require("./volunteer");

const eventSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    titel: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    maxParticpants: {
      type: Number,
      required: true,
    },
    participants: {
      type: Number,
      required: true,
      default: 0,
    },
    poster: {
      url: {
        type: String,
        required: true,
        trim: true,
      },
      publicID: {
        type: String,
        required: true,
        trim: true,
      },
    },
    volunteers: {
      type: Boolean,
      required: true,
      default: false,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
