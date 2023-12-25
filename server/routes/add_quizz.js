const express = require('express');
const checkAuth = require('../middleware/check-auth');
const QuizzController = require('../controller/quizz');
const router = express.Router();

router.get('/', (req, res, next) => {
    QuizzController.get_all()
    .then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(500).json(err);
    })
})

router.post('/', checkAuth, (req, res, next) => {
    QuizzController.add_quizz(req.body.title, req.body.questions, req.body.responses, req.body.admin_name)
    .then(doc => {
        res.status(200).json({message: "quizz added succesfully", doc: doc})
    })
    .catch(err=>{
        res.status(500).json(err);
    })
})

// router.delete('/:idProduct', checkAuth, (req, res, next) => {
//     const id = req.params.idProduct;
//     Products.deleteOne({_id: id})
//     .then(result => {
//         res.status(200).json(result);
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         });
//     });
// });

module.exports = router;