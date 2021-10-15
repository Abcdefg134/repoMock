const mongoose = require('mongoose')
const requestChatSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatGroup'
    },
    created: {
        type: Date,
        default: Date.now
    }
})

var RequestChat = mongoose.model('RequestChat', requestChatSchema)
module.exports = RequestChat