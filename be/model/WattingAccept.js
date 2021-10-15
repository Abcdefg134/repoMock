const mongoose = require('mongoose')
const wattingAcceptSchema = mongoose.Schema({
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

var WattingAccept = mongoose.model('WattingAccept', wattingAcceptSchema)
module.exports = WattingAccept