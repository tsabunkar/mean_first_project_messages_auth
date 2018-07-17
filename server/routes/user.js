var express = require('express');
var router = express.Router();
var {
    UserModel
} = require('../models/user')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

router.post('/', function (req, res, next) {

    var userModel = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });

    userModel.save((err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'An error has occured bro!',
                error: err
            })
        }

        res.status(201).json({
            message: "User created!!",
            obj: result
        })
    })
});

//POST
//http://localhost:4000/user/signin
router.post('/signin', function (req, res, next) {
    console.log(req.body);
    UserModel.findOne({ email: req.body.email }).then((userObj) => {
        if (!userObj) {
            return res.status(401).json({
                title: 'No user is found for this emailId !',
                error: { message: 'User could not found' }
            })
        }
        if (!bcrypt.compareSync(req.body.password, userObj.password)) {
            return res.status(401).json({
                title: 'Password didnt match !',
                error: { message: 'Password didnt match' }
            })
        }

        //user is authenticated successfully

        //creating a jwt token & giving it to client,which will be required by the 
        //authenciated client for future request (so that using this token we can 
        //authorize the user rather than asking him to authenticate eachtime by entering
        // emailId&pass creds)

        var jwtToken = jwt.sign({ user: userObj }, 'tejas123', { expiresIn: 7200 })//first argum is payload(data) which will be stored in the token,
        // 2nd argu is secret key, 3rd argum is Object in which we specifiy the time @which token will get expired(in seconds)
        //60*2*60=7200seconds -> which means 2hrs

        res.status(200).json({
            message: 'Successfully logged in',
            token: jwtToken,
            userId: userObj._id,
            status: 200
        })

    }).catch((err) => {
        return res.status(500).json({
            title: 'An error has occured bro!',
            error: err
        })
    });
})



module.exports = router;