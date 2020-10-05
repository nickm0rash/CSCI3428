/**
 * Specialist is the child of Account (1:1)
 * @author Justin Gray (A00426753)
 */
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Specialist",
  new mongoose.Schema({
    // _id set automatically
    // __v set automatically
    account: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    manages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    ],
  })
);
