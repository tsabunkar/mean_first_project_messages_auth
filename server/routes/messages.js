var express = require('express');
var router = express.Router();
var {
    MessageModel
} = require('../models/message')
var {
    UserModel
} = require('../models/user')
const _ = require('lodash');
const {
    ObjectID
} = require('mongodb')
var jwt = require('jsonwebtoken')

//GETALL
//localhost:3000/message/
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

//using this middleware to know weather user is loggedin or not, inorder to redirect
// to below routes ie- post,patch,delete of messages
//i.e -allowing only then authenticated user to from CRUD opern on messages, we r verifiying the user is
//authenticated by taking the token value which will be saved in LocalStorage of client browser when user logs in!!
//this token value is passed as query parameter in the uri itself from client -> server (other way of passing the token value is using Header)
router.use('/', function (req, res, next) {
    // console.log(req.query.token); //this will fetch the <tokenValue> which has been passed as query parameter 
    //in the uri like- http://localhost:4000_____?token=<TOKENVALUE> 
    //for ex-
    //http://localhost:4000/message/5b4ef___?token=eyJjN543q0___
    //http://localhost:4000/message?token=eyJhbGci452395_____

    jwt.verify(req.query.token, 'tejas123', (err, decodedUserObj) => {
        // console.log(decodedUserObj);

        if (err) { //if token is invalid or expried then execute this block of code
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            })
        }
        next();
    })
})


//POST
//localhost:3000/message/
router.post('/', function (req, res, next) {
    //fetching UserObject from token value using decode() method
    var userObjectDecodedFromToken = jwt.decode(req.query.token)//it does not check the validaity[like-jwt.verify()], it will just decode the token and give u back the userObject
    UserModel.findById(userObjectDecodedFromToken.user._id).then((userObject) => {
        //find particular userObject from the decode_ObjectId from UserModel
        var message = new MessageModel({
            content: req.body.content,
            user: userObject._id//objectId of the person/user who has created this messageObject
        })

        message.save().then((messageObj) => {//save message Object
            // console.log(messageObj);
            // console.log(messageObj._id);
            //messageModel collec is updated but we need to also update the userModel which has a property -> messages [] (messagesArray)
            userObject.messages.push(messageObj);//from userObject which has messages array(property), push the messageObject in that array

            userObject.save().then((result) => {//update that userObject(bcoz-a new value has been added to messages property in userMdoel collec)
                res.status(201).json({
                    message: "Saved Message!!",
                    obj: messageObj
                });
            }).catch((err) => {
                return res.status(500).json({
                    title: 'An error has occured while saving the user Object',
                    error: err
                })
            });

        }).catch((err) => {
            return res.status(500).json({
                title: 'An error has occured while saving the message Object',
                error: err
            })
        });




    }).catch((err) => {
        return res.status(500).json({
            title: 'An error has occured while decoding the token from query parameter in uri',
            error: err
        })
    });


});




//PATCH
//localhost:3000/message/ObjectId
//below we r finding and then again saving the document, here mongoose is ensuring that if same ObjectId then
//instead of creating a new document just update the existing document
//I didn't like this approach :)
router.patch('/:id', function (req, res, next) {
    var userObjectDecodedFromToken = jwt.decode(req.query.token)

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
        if (messObjRetrievedForParticId.user != userObjectDecodedFromToken.user._id) {
            //if login user/client is not  same as the user who has created the message Object then execute this statm
            return res.status(401).json({
                title: 'Unauthorize user',
                error: { message: 'User donot match' }
            })
        }

        messObjRetrievedForParticId.content = req.body.content; //assinging the updated mess from frontend to backend
        messObjRetrievedForParticId.save((err, result) => {//saving this document (just like new document),
            // but mongoose ensures that if same objectId is present then don't save as new docum but 
            //rather update the exisitng document

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
});



/* 
router.patch('/:id', function (req, res, next) {

    let uriToUpdate = req.params.id;
    var userObjectDecodedFromToken = jwt.decode(req.query.token)

    var rxedBody = _.pick(req.body, ['content']) //I shld allow to update only content property
    if (!ObjectID.isValid(uriToUpdate)) { //If Id is not valid format then exec this if body
        response.status(404).send({
            title: 'An error has occured bro!, due to invalid format of id'
        });
        // console.log('Id Format is not valid');
        return
    }

    MessageModel.findOneAndUpdate({
        _id: uriToUpdate
    }, {
            $set: rxedBody
        }, {
            new: true
        })
        .then((updatedMessObj) => {

            if (!updatedMessObj) {
                return res.status(500).json({
                    title: 'No message document is found in the collection',
                    error: {
                        message: 'Message not found bro!'
                    }
                })
            }

            if (updatedMessObj.user != userObjectDecodedFromToken.user._id) {
                //if login user/client is not  same as the user who has created the message Object then execute this statm
                return res.status(401).json({
                    title: 'Unauthorize user',
                    error: { message: 'User donot match' }
                })
            }

            //success scenario
            res.status(200).json({
                message: "Updated Message!!",
                obj: updatedMessObj
            })
        }).catch((err) => {
            return res.status(500).json({
                title: 'An error has occured bro!',
                error: err
            })
        });
}) */



//DELETE
//localhost:3000/message/ObjectId
router.delete('/:id', function (req, res, next) {
    var userObjectDecodedFromToken = jwt.decode(req.query.token);
    MessageModel.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found in the collection!',
                error: { message: 'Message not found' }
            });
        }
        if (message.user != userObjectDecodedFromToken.user._id) {
            //if login user/client is not  same as the user who has created the message Object then execute this statm
            return res.status(401).json({
                title: 'Not Authenticated',
                error: { message: 'Users do not match' }
            });
        }
        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});



//DELETE
//localhost:3000/message/ObjectId
/* 
router.delete('/:id', function (req, res, next) {
    var userObjectDecodedFromToken = jwt.decode(req.query.token)
    MessageModel.findOneAndRemove({
        _id: req.params.id
    }).then((messObjDeleted) => {
        if (!messObjDeleted) {
            return res.status(500).json({
                title: 'No message document is found in the collection for this particular ObjectId',
                error: {
                    message: 'ObjectId not found bro!'
                }
            })
        }

        if (messObjDeleted.user != userObjectDecodedFromToken.user._id) {
            //if login user/client is not  same as the user who has created the message Object then execute this statm
            return res.status(401).json({
                title: 'Unauthorize user',
                error: { message: 'User donot match' }
            })
        }

        res.status(200).json({
            message: "Deleted Message!!",
            obj: messObjDeleted
        })


    }).catch((err) => {
        return res.status(500).json({
            title: 'An error has occured bro!',
            error: err
        })
    });
}) */



module.exports = router;