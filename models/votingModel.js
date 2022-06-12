const mongoose = require("mongoose");

const votingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },

  voteup: {
    type: Boolean,
    default: null,
  },

  votedown: { type: Boolean, default: null },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("voting", votingSchema);
