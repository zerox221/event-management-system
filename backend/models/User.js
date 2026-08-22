const mongoose = require("mongoose");

const addtionalInfoSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "organizer"],
      default: "user",
    },
    additionalInfo: {
      type: addtionalInfoSchema,
      default: {},
    },
    profile: {
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
