/**
 * Emails are referenced by M Accounts until all M Accounts
 * have deleted the email from their box. Non-account contacts
 * may exist on an email object, but once all contacts have
 * no account reference, the Email document should be deleted.
 * @author Justin Gray (A00426753)
 */
const mongoose = require("mongoose");
const contactSchema = require("./contactSchema");

const emailSchema = new mongoose.Schema({
  // _id set automatically
  // __v set automatically
  date: {
    type: Number,
    min: 1,
    default: () => Date.now(),
    required: true,
  },
  subject: {
    type: String,
    maxlength: 512,
    default: "",
    required: true,
  },
  body: {
    type: String,
    maxlength: 60000,
    default: "",
    required: true,
  },

  // when an account deletes an email, also remove
  // 'account' from the corresponding email's contactSchema
  // => when there are no more populatable accounts,
  //    we can safely remove the email from the db
  from: contactSchema,
  to: [contactSchema],
  cc: [contactSchema],
  bcc: [contactSchema],
});

module.exports = mongoose.model("Email", emailSchema);
