const express = require("express");
const questionRoute = express.Router();
const {
  logquestion,
  voteUp,
  voteDown,
  getQuestionById,
} = require("../controller/questionController.js");



questionRoute.post("/questions", logquestion);

questionRoute.post("/voteup", voteUp);

questionRoute.post("/votedown", voteDown);



questionRoute.get("/:id", getQuestionById);


module.exports = questionRoute;
