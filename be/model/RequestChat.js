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
    }
},{timestamps:true})

var RequestChat = mongoose.model('RequestChat', requestChatSchema)
module.exports = RequestChat