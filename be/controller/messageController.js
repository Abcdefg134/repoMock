const express = require('express')
const router = express.Router()
const Message = require('../model/Message')
const mongoose = require('mongoose')
const path = require('path')
const constants = require('../constants')
const ChatGroup = require('../model/ChatGroup')
//Send message
router.post('/send', constants.upload.single('img'), async (req, res) => {
    const authId = req.authenticateUser._id
    let message = new Message({
        _id: new mongoose.Types.ObjectId(),
        user: authId,
        message: req.body.message,
        img: req.file?.path,
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
        const groupChat = await ChatGroup.findById(message.groupId)
        if (groupChat) {
            check = Boolean(groupChat.mod == authId)
            console.log(check);
        }
    }
    if (check) {

        Message.findByIdAndDelete(id, (err, docs) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ mess: "Deleted" + id })
            }
        })
        ChatGroup.findByIdAndUpdate(message.groupId, {
            $pull: { messages: id }
        }, { new: true }).exec((err) => {
            if (err) throw err
        })
    }
})
module.exports = router