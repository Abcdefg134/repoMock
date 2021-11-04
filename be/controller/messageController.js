const express = require('express')
const router = express.Router()
const Message = require('../model/Message')
const mongoose = require('mongoose')
const path = require('path')
const constants = require('../constants')
const ChatGroup = require('../model/ChatGroup')
//Send message
router.post('/send', constants.upload.single('message'), async (req, res) => {
    const authId = req.authenticateUser._id
    let message = new Message({
        _id: new mongoose.Types.ObjectId(),
        user: authId,
        message: req.file ? req.file.path : req.body.message,
        groupId: req.body.groupId
    })

    const groupChat = await ChatGroup.findById(message.groupId)
    let check = false
    if (groupChat) {
        check = groupChat.members.includes(authId)
    }
    if (check && groupChat) {
        message.save((err) => {
            if (err) throw err
            console.log("send");
        })
        ChatGroup.findByIdAndUpdate(message.groupId, {
            $push: { messages: message._id }
        }, { new: true }).exec((err) => {
            if (err) return res.status(404).send({ 'err': err })
        })
        res.json({ "message": message })
    } else {
        res.status(405).send("can not send message")
    }
})


// Delete message

router.delete('/delete/:id', async (req, res) => {
    const id = { _id: req.params.id }
    const authId = req.authenticateUser._id
    const message = await Message.findById(id)
    let check = false
    if (message) {
        const convertMessage = JSON.parse(JSON.stringify(message))
        const groupChat = await ChatGroup.findById(convertMessage.groupId)
        if (groupChat) {
            const convertGroupChat = JSON.parse(JSON.stringify(groupChat))
            check = Boolean(convertGroupChat.mod == authId)
            console.log(check);
        }
    }
    if (check) {
        Message.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ mess: "Deleted" + id })
            }
        })
        ChatGroup.findByIdAndUpdate(message.groupId, {
            $pull: { messages: req.params.id }
        }, { new: true }).exec((err) => {
            if (err) throw err
        })
    }
})
module.exports = router