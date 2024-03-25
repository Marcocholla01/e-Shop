const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
      filename: {
        type: String,
      },
    },
  ],
});

messagesSchema.set("timestamps", true);

module.exports = mongoose.model("Messages", messagesSchema);
