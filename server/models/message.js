const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema creates the blue-print of the models
const { UserModel } = require('./user')

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, //ObjectId-> unique id created by mongodb
        ref: 'user_collection' //ref->reference to another model
    }
});

//post() -> do the functionality after action occured [action is specified in 1st argum]
//pre() -> do the functionality before action occured [action is specified in 1st argum]
//MONGOOSE MIDDLEWARE
MessageSchema.post('remove', (message) => {
    //this functionality is executed after findOneAndRemove action is executed
    // console.log(message.user);
    UserModel.findById(message.user, (err, user) => {//fetching the particular userObject
        user.messages.pull(message._id);//from that userobject removing the particular message ObjectId 
        user.save();//and again resaving that userObject to the UserModel collection
    })
})

var MessageModel = mongoose.model('mess_collec', MessageSchema)

module.exports = {
    MessageModel
}