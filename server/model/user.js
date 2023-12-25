const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role: String, //Admin , superAdmin, user,...
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model('users', userModel);