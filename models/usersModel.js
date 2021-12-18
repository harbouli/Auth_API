const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxlength: 20,
    },
    lastname: {
      type: String,
      maxlength: 20,
    },
    email: {
      require: true,
      unique: true,
      type: String,
      minlength: 5,
      trim: true,
    },
    password: {
      require: true,
      type: String,
    },
    role: {
      type: Number,
      default: 0, // 0 User 1 Admin
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
