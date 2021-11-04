const mongoose = require('mongoose')
const waittingAcceptSchema = mongoose.Schema({
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

var WaittingAccept = mongoose.model('WaittingAccept', waittingAcceptSchema)
module.exports = WaittingAccept