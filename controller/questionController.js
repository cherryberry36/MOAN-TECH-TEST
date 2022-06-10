const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const questionSchema = require("../models/questionModel")
const {
  validatePostInput
} = require("../utils/validation");

const logquestion = async (req,res) => {
    console.log("i am running")

    const {errors, isValid} = validatePostInput(req.body);

    if (!isValid){
        return res.status(400).json(errors)
    }
    const userId =  mongoose.Types.ObjectId(req.user)
   const newquestion = new questionSchema({ 
       topic: req.body.topic,
       question: req.body.question,
       userId: userId
    })
    console.log("i am running question",userId)
    newquestion.save()
 .then(createdQuestion  => res.status(200).json({
    success: true,
    question: createdQuestion}));
}



module.exports = {logquestion}