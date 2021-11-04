var mongoose = require('mongoose')
var chatGroupSchema = mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    mod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
},{timestamps:true})
var ChatGroup = mongoose.model('ChatGroup', chatGroupSchema)
module.exports = ChatGroup