var mongoose = require('mongoose')
var messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatGroup',
        require: true
    },
},{timestamps:true})
var Message = mongoose.model('Message', messageSchema)
module.exports = Message