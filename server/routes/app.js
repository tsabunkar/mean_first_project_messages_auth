var express = require('express');
var router = express.Router();
var {
    UserModel
} = require('../models/user')

router.get('/', function (req, res, next) {
    res.render('index.hbs');
});

/* router.get('/', function (req, res, next) {
    UserModel.findOne({}, (err, userObjReterieved)=>{
        if(err){
            res.send('Error')
            return
        }

        console.log(userObjReterieved);
        res.render('node.hbs',{emaildocumReter : userObjReterieved});
    });

}); */
/* router.get('/message/:msg', function (req, res, next) {
    res.render('node.hbs',{message : req.params.msg});
}); */


/* router.post('/message', (req,res, next)=>{
    var email = req.body.emailname;
    res.redirect('/message/'+email); //will be redirected to GET method -> localhost:3000/message
}) */

/* router.post('/message', (req, res, next) => {
    var email = req.body.emailname;
    var userObj = new UserModel({
        firstName: 'Tejas',
        lastName: 'Sabunkar',
        password: '11',
        email
    });
    console.log(userObj);
    userObj.save();
    res.redirect('/');
}) */


module.exports = router;