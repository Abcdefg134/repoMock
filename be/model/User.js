var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    }],
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatGroup'
    }],
    watting: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watting'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})
var User = mongoose.model('User', userSchema)
module.exports = User