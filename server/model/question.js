const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quizz: {type: mongoose.Schema.Types.ObjectId, ref: 'quizz', required: true},
    content: String,
    type: Boolean,
});

module.exports = mongoose.model('questions', questionSchema);