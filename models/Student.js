/**
 * Student is the child of Account (1:1)
 * @author Justin Gray (A00426753)
 */

const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Student",
  new mongoose.Schema({
    // _id set automatically
    // __v set automatically
    account: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    specialist: {
      type: mongoose.Types.ObjectId,
      ref: "Specialist",
    },
    name: {
      type: String,
      maxlength: 128,
      default: "",
      required: true,
    },
    email: {
      type: String,
      maxlength: 256,
      default: "student@autismns.ca",
      required: true,
    },

    settings: [String], // todo flesh out if time
  })
);
