const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { token } = require("morgan");
const questionSchema = require("../models/questionModel");
const votingSchema = require("../models/votingModel");
const isEmpty = require("../utils/is-empty");
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

  

  const y = await votingSchema.find({
    user: user,
    question: question,
    voteup: true,
  });

  if (!isEmpty(y)) {
    return res.status(400).json({
          success: false,
          message: "You have already upvoted",
        });
  } 

  // z = user has voteddown before and wants to vote up

  const z = await votingSchema.find({
    user: user,
    question: question,
    votedown: true,
  });


  if (!isEmpty(z)) {
    z[0].votedown = null;
    z[0].voteup = true;
    z[0].save();
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
};

const voteDown = async (req, res) => {
  const question = req.query.question_id;
  const user = req.user.id;
  const votedown = true;

  // y = user has downvoted before

  const y = await votingSchema.find({
    user: user,
    question: question,
    votedown: true,
  });

  // z == user has voted up before and wants to vote down

  const z = await votingSchema.find({
    user: user,
    question: question,
    voteup: true,
  });

  if (!isEmpty(y)) {
    res.status(400).json({
      success: false,
      message: "you have already downnvoted",
    });
  }

  if (!isEmpty(z)) {
    z[0].votedown = true;
    z[0].voteup = null;
    z[0].save();
    // console.log(z.);
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
