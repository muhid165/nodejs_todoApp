const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  createdAt: {
    type:Date,
    default:Date.now,
  },
});

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
