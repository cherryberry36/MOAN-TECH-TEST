const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { token } = require("morgan");
const questionSchema = require("../models/questionModel");
const votingSchema = require("../models/votingModel");

const { validatePostInput } = require("../utils/validation");

const logquestion = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const userId = mongoose.Types.ObjectId(req.user);
  const newquestion = new questionSchema({
    topic: req.body.topic,
    question: req.body.question,
    userId: userId,
  });

  newquestion.save().then((createdQuestion) =>
    res.status(200).json({
      success: true,
      question: createdQuestion,
    })
  );
};



const voteUp = async (req, res) => {
  const question = req.query.question_id;
  const user = req.user.id;
  const voteup = true;

  // y = user has votedup before

  const y = votingSchema.find({ user: user, question: question, voteup: true });

  // z = user has voteddown before and wants to vote up

  const z = votingSchema.find({
    user: user,
    question: question,
    votedown: true,
  });

  if (y) {
    return res.status(400).json({
      success: false,
      message: "You have already upvoted",
    });
  }

  if (z) {
    z.votedown = null;
    z.voteup = true;
    z.save();
    return res.status(200).json({
      success: true,
      message: "updated to upvote",
    });
  }

  const voting = new votingSchema({
    user,
    question,
    voteup,
  });

  voting.save().then((upVote) =>
    res.status(200).json({
      success: true,
      question: upVote,
    })
  );

  console.log(req.user.id);

  console.log(req.query.question_id);
};



const voteDown = async (req, res) => {
  const question = req.query.question_id;
  const user = req.user.id;
  const votedown = true;

  // y = user has downvoted before

  const y = votingSchema.find({
    user: user,
    question: question,
    votedown: true,
  });

  // z == user has voted up before and wants to vote down

  const z = votingSchema.find({
    user: user,
    question: question,
    voteup: true,
  });

  if (y) {
    res.status(400).json({
      success: false,
      message: "you have already downnvoted",
    });
  }

  if (z) {
    z.votedown = true;
    z.voteup = null;
    z.save();
    return res.status(200).json({
      success: true,
      message: "updated to downvote",
    });
  }

  const voting = new votingSchema({
    user,
    question,
    votedown,
  });

  voting.save().then((downVote) =>
    res.status(200).json({
      success: true,
      question: downVote,
    })
  );
};



const getQuestionById = async (req, res) => {
  const question = await questionSchema.findById({ _id: req.query.id });
  const upvote = await votingSchema
    .find({ question: req.query.id, upvote: true })
    .countDocuments();
  const downvote = await votingSchema
    .find({ question: req.query.id, downvote: true })
    .countDocuments();
  return res.status(200).json({
    Question: question,
    UpVote: upvote,
    DownVote: downvote,
  });
};

module.exports = { logquestion, voteUp, voteDown, getQuestionById };
