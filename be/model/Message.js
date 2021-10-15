var mongoose = require('mongoose')
var messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mesage: {
        type: String,
        required: true
    },
    img: String,
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatGroup',
        require: true
    },
    created: {
        type: Date,
        default: Date.now,
    }
})
var Message = mongoose.model('Message', messageSchema)
module.exports = Message