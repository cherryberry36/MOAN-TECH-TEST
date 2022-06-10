const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    topic: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
   
})

module.exports = mongoose.model('questions', questionSchema)