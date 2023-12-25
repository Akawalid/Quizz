const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: String,
    isTrue: Boolean,
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'questions', required: true },
});

module.exports = mongoose.model('responses', questionSchema);