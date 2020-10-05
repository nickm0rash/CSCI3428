/**
 * An identity, optionally attached to a real Account.
 * @author Justin Gray (A00426753)
 */
const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    default: "",
    required: true,
  },
  email: {
    type: String,
    maxlength: 256,
    default: undefined,
    required: true,
  },
  account: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
    required: false,
  },
});
