//for ID
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

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

const user_connection = (email, password) => {
    return userModel.findOne({email: email})
    .then(user => {
        if(!user){
            return {message: "email not found!", status:404}
            //res.status(404).json({message: "email not found!"});
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    return {message: "auth failed.", status: 401};
                }

                if(result){
                    const token =  jwt.sign({
                        email: req.body.email
                    }, 
                    process.env.PRIVATE_KEY, 
                    {
                        expiresIn: "1h"
                    }, 
                    )
                    //return res.status(200).json({token: token, message: "auth succesfuly.", succeed: true});
                    return {token: token, message: "auth succesfuly.", status:200}
                } 
                
                //return res.status(500).json({message: "auth failed.", succeed:false})
                return {message: "auth failed.", status: 500} 
            })
        }
    })
    .catch(err => {
       return {error: err, status: 500}
})}

module.exports = {
    get_all_users, 
    add_user, 
    delete_user, 
    user_connection
};