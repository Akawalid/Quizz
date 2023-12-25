const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    qr: Buffer
});

module.exports = mongoose.model('quizz', questionSchema);