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

const tempUserModel = new mongoose.Schema({
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
  otp: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Date,
    required: true,
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
    }, profile: {
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
  additionalInfo: {
    type: addtionalInfoSchema,
    default: {},
  },
});

tempUserModel.index({ expiresIn: 1 }, { expireAfterSeconds: 1 });

module.exports = mongoose.model("TempUser", tempUserModel);
