//for ID
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
require('dotenv').config();

const add_user = (email, password, role, username) => {
    return userModel.findOne({email: email})
    .then(users => {
        if(users)
            return {message: "user exists", status: 409}

        return bcrypt.hash(password, 10)    
    })
    .then(hash => {
        const newUser = new userModel({
            _id: new mongoose.Types.ObjectId(),
            role: role,
            username: username,
            email: email, 
            password: hash
        })
        return newUser.save()
    })
    .then(doc => {
        return {doc:doc, status: 200}
        //res.status(200).json(result);
    })
    .catch(err => {
        return {error: err, status:500}
        //res.status(500).json(err);
    });
}

const delete_user = (user_id) => {
    return userModel.findOne({_id: user_id})
    .then(doc => {
        if(doc.role === 'ADMIN')
            throw new Error('Cannot delete an admin')
        else
        return userModel.deleteOne({_id: user_id});
    })
    .then(doc =>{
        return doc
    })
    .catch(err => {
        throw new Error(JSON.stringify(err));
    })
}

const get_all_users = () => {
    return userModel.find()
    .then(users => {
        return users
    })
    .catch(err => {
        throw new Error(JSON.stringify(err));
    })
}

const user_connection = async (email, password) => {
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return { message: "Email not found!", status: 404 };
        }

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            const token = jwt.sign(
                { email },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            return { token, message: "Auth successful.", status: 200 };
        } else {
            return { message: "Auth failed.", status: 401 };
        }
    } catch (error) {
        return { error: error.message, status: 500 };
    }
};


module.exports = {
    get_all_users, 
    add_user, 
    delete_user, 
    user_connection
};