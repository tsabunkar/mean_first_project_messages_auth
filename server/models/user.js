const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema creates the blue-print of the models
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true //unique validation don't maintain the uniqunees for this email prop
    },
    messages: { //having oneToMany relationship -> one user can send Many messages soo this field is an array
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'mess_collec' //ref->reference to another model
        }]
    }
});

// UserSchema.plugin(uniqueValidator); //make ensure that property with unique validation is applied to its property for UserSchema 

var UserModel = mongoose.model('user_collection', UserSchema)

module.exports = {
    UserModel
}