const jwt = require('jsonwebtoken');

module.exports =  (req, res, next) => {
    try{
        const decoded = jwt.verify(req.header.authorization.split(" ")[1], process.env.SECRET_KEY)
        next();
    } catch(err){
        res.status(401).json('message: "auth failed.')
    }
}