var express = require('express');
var router = express.Router();
var {
    UserModel
} = require('../models/user')
var bcrypt = require('bcryptjs');

router.post('/', function (req, res, next) {
  /*   console.log("--------");
    console.log(req.body);
    console.log(req.body.password); */
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



module.exports = router;