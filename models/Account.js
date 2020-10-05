/**
 * Accounts must be either a Student or a Specialist, but not both.
 * @author Justin Gray (A00426753)
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const contactSchema = require("./contactSchema");

const accountSchema = new mongoose.Schema({
  // _id set automatically
  // __v set automatically
  name: {
    type: String,
    maxlength: 128,
    default: undefined,
    required: true,
  },
  email: {
    type: String,
    maxlength: 256,
    default: undefined,
    required: true,
  },
  password: String, // bcrypt hashed
  inbox: [
    {
      _id: false,
      flags: [String],
      email: {
        type: mongoose.Types.ObjectId,
        ref: "Email",
      },
    },
  ],
  sent: [
    {
      _id: false,
      flags: [String],
      email: {
        type: mongoose.Types.ObjectId,
        ref: "Email",
      },
    },
  ],
  contacts: {
    type: [contactSchema],
    required: true,
    default: [],
  },
});

/**
 * Gets the JSONWebToken for the account document
 * Included properties in JWT body:
 *  - _id
 *  - __v
 * @author Justin Gray (A00426753)
 */
accountSchema.methods.getAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      __v: this.__v,
    },
    "todo_change2_supersecret_key"
  );
};

/**
 * Finds if a given string is the account's password.
 * @param {String} plainTextPassword the entered password from the user attempting
 *                                   to access the account
 * @returns {Promise<boolean>} if the password matches
 * @author Justin Gray (A00426753)
 */
accountSchema.methods.isValidPassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

// we have to use function() instead of () => {} for an accessible 'this'
accountSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.increment(); // changing the password will expire the jwt
  bcrypt
    .genSalt(12)
    .then(function (salt) {
      return bcrypt.hash(this.password, salt);
    })
    .then(function (hashed) {
      this.password = hashed;
      return next();
    })
    .catch((err) => console.error(JSON.stringify(err)));
});

module.exports = mongoose.model("Account", accountSchema);
