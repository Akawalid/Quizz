const express = require("express");
const login_router = require('./routes/login');
const quizz_router = require('./routes/add_quizz')
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_DATABASE_LINK);

const app = express();

const port = process.env.PORT || 8000;

app.use(morgan('combined')); 
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
        extended: true
    }));
app.use('/api/auth/', login_router); // Requests processing will be defined in the file router
app.use('/api/quizz', quizz_router);

app.listen(port, () => console.log('Server app listening on port ' + port));