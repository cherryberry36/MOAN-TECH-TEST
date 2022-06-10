const express = require('express')
const questionRoute = express.Router()
const {logquestion} = require('../controller/questionController.js')


questionRoute.post('/questions', logquestion)




module.exports = questionRoute