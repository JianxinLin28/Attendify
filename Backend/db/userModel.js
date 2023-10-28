const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [false, "Email Exist"],
    },
    spire_id: {
        type: Number,
        required: [true, "Please provide a Spire ID!"],
        unique: [true, "invalid spire ID"],
    },
    first_name: {
        type: String,
        required: [true, "Please provide a first name!"],
        unique: [true, "invalid first name"],
    },
    last_name: {
        type: String,
        required: [true, "Please provide a last name!"],
        unique: [true, "invalid last name"],
    },
    password_hash: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    role: {
        type: String,
        required: [true, "Please provide a role!"],
        unique: false,
    },
  })

  module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);