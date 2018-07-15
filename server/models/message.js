const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema creates the blue-print of the models

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, //ObjectId-> unique id created by mongodb
        ref:  'user_collection' //ref->reference to another model
    }
});

var MessageModel = mongoose.model('mess_collec', MessageSchema)

module.exports = {
    MessageModel
}