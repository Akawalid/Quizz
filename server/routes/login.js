const express = require('express')
const router = express.Router();
const UserController = require('../controller/user');

router.post('/login', (req, res, next) => {
    UserController.user_connection(req.body.email, req.body.password)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/users', (req, res, next) => {
    UserController.add_user(req.body.email, req.body.password, req.body.username)
    .then(result => {
        res.status(result.status).json(result)
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router