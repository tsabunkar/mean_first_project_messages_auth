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

router.patch('/:id', function (req, res, next) {
    MessageModel.findById(req.params.id, (err, messObjRetrievedForParticId) => {
        console.log(messObjRetrievedForParticId);
        if (err) {
            return res.status(500).json({
                title: 'An error has occured bro!',
                error: err
            })
        }
        if (!messObjRetrievedForParticId) { //if no message document is found in the collection
            return res.status(500).json({
                title: 'No message document is found in the collection',
                error: {
                    message: 'Message not found bro!'
                }
            })
        }

        messObjRetrievedForParticId.content = req.body.content; //assinging the updated mess from frontend to backend
        messObjRetrievedForParticId.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error has occured bro!',
                    error: err
                })
            }

            res.status(200).json({
                message: "Updated Message!!",
                obj: result
            })

        });

    })
})

module.exports = router;