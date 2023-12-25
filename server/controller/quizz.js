const Users = require('../model/user');
const Quiz = require('../model/quizz');
const Questions = require('../model/question');
const Responses = require('../model/responses');
const mongoose = require('mongoose');
const qrCode = require('qrcode');

const add_quizz =  async (title, questions, responses, admin_name) => {
    let quizId, admin_id, questions_ids = [];
    
    Users.findOne({ username: admin_name })
        .then(admin => {
            if (admin != null) {
                quizId = new mongoose.Types.ObjectId();
                admin_id = admin.id;

                // Modify each question object in the questions array
                questions.forEach(e => {
                    const questionId = new mongoose.Types.ObjectId();
                    questions_ids.push(questionId);

                    e._id = questionId;
                    e.quizz = quizId;
                });

                // Insert questions into the database
                return Questions.insertMany(questions);
            } else {
                throw new Error('Admin not found!')
            }
        })
        .then(() => {
            // Insert responses into the database
            return Responses.insertMany(responses.map(e => {
                e._id = new mongoose.Types.ObjectId();
                e.question = questions_ids.shift();
            }));
        })
        .then(() => {
            // Generate a unique QR code for each quiz
            const qrCodeData = {
                quizId: quizId.toString(),
                author: admin_id.toString()
            };

            return qrCode.toDataURL(JSON.stringify(qrCodeData));
        })
        .then(qrCodeUrl => {
            // Create a new Quiz
            const newQuiz = new Quiz({
                _id: quizId,
                title: title,
                owner: admin_id,
                qr: qrCodeUrl,
            });

            // Save the new Quiz
            return newQuiz.save();
        })
        .then(doc => {
            return doc
            //res.status(200).json({ message: "Added a new quizz" });
        })
        .catch(err => {
            throw new Error(JSON.stringify(err));
        });
};

const get_all = async () => {
    return Quiz.find()
    .then(doc => {
        return doc
    })
    .catch(err => {
        throw new Error(JSON.stringify(err));
    })
}
module.exports = {
    add_quizz,
    get_all
}
