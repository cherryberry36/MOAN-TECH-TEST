const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  topic: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  voteup: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }],
  votedown: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("questions", questionSchema);
