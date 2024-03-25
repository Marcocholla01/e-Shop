const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    default: "Proccessing",
  },
});

contactFormSchema.set("timestamps", true);

module.exports = mongoose.model("ContactForm", contactFormSchema);
