const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    default: 0
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;