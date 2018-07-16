var express = require('express');
var router = express.Router();
var {
    MessageModel
} = require('../models/message')

//localhost:3000/message/
router.post('/', function (req, res, next) {
    var message = new MessageModel({
        content: req.body.content
    })

    message.save((err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'An error has occured bro!',
                error: err
            })
        }

        res.status(201).json({
            message: "Saved Message!!",
            obj: result
        })

    })
});

router.get('/', function (req, res, next) {
    MessageModel.find()
        .exec((err, documentMess) => { //exec -> Executes the query
            if (err) {
                return res.status(500).json({
                    title: 'An error has occured bro!',
                    error: err
                })
            }

            res.status(201).json({
                message: "Successfully retrieved",
                listMessages: documentMess
            })

        })
})

module.exports = router;