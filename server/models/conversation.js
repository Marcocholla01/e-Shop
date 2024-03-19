const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  groupTittle: {
    type: String,
  },
  members: {
    type: Array,
  },
  lastMessage: {
    type: String,
  },
  lastMessageId: {
    type: String,
  },
});

conversationSchema.set("timestamps", true);

module.exports = mongoose.model("Conversation", conversationSchema);
