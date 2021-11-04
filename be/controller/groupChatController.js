const express = require('express')
const router = express.Router()
const ChatGroup = require('../model/ChatGroup')
const User = require('../model/User')
const mongoose = require('mongoose')
const RequestChat = require('../model/RequestChat')


router.get('/:id', async (req, res) => {
    const id = { _id: req.params.id }
    const authId = req.authenticateUser._id
    const user = await User.findById(authId)
    const convertUserToJson = JSON.parse(JSON.stringify(user))
    console.log(convertUserToJson);
    console.log(id);
    const check = convertUserToJson.chat.includes(req.params.id)
    console.log(check);
    if (check) {
        ChatGroup.findById(id)
            .populate([
                {
                    path: 'messages',
                    populate: {
                        path: 'user',
                        select: ['name,avatar']
                    },
                    select:['updateAt','message'],
                    options:{
                        sort:{'updateAt':-1}
                    }
                },
                {
                    path: 'mod',
                    select: ['name,avatar']
                }, {
                    path: 'members',
                    select: ['name', 'avatar']
                },{
                    path:'members',
                   select:['name','avatar']
                }
            ])
            .exec((err, groupChat) => {
                if (err) throw err
                res.json(groupChat)
            })
    } else {
        res.status(400).send({ err: 'Can not access' })
    }
})
// accept request
//Requests in user need to accept
//Waitting in user gave request
router.post('/accept-request/:id', async (req, res) => {
    const id = { _id: req.params.id } // id of the requestChat
    const authId = req.authenticateUser._id // id user after login
    const user = await User.findById(authId) // info user after login
    const convertUserToJson = JSON.parse(JSON.stringify(user))
    console.log(convertUserToJson.requests);
    console.log(id);
    let check = convertUserToJson.requests.includes(req.params.id) // check 
    console.log(check);
    let chatRequestInfo = await RequestChat.findById(id)
    if (check) {
        if (chatRequestInfo.chatID) {
            ChatGroup.findByIdAndUpdate(chatRequestInfo.chatID, {
                $push: { members: authId }
            }, { new: true }).exec((err) => {
                if (err) throw err
            })
            User.findByIdAndUpdate(authId, {
                $pull: { requests: req.params.id },
                $push: { chat: chatRequestInfo.chatID }
            }, { new: true }).exec((err) => {
                if (err) throw err
            })
            User.findByIdAndUpdate(chatRequestInfo.user, {
                $pull: { waitting: req.params.id }
            }, { new: true }).exec((err, result) => {
                if (err) throw err
                res.json(result)
            })
        }
        else {
            let body = new ChatGroup({
                _id: new mongoose.Types.ObjectId(),
                members: [
                    chatRequestInfo.user, authId
                ],
                messages: [],
                mod: chatRequestInfo.user,
                name: ''
            })
            //if (check) {
            body.save((err, chat) => {
                if (err) throw err
                console.log('Group chat saved');
                res.json(chat)
            })
            User.findByIdAndUpdate(authId, {
                $pull: { requests: req.params.id },
                $push: { chat: body._id }
            }, { new: true }).exec((err) => {
                if (err) throw err
            })
            User.findByIdAndUpdate(chatRequestInfo.user, {
                $pull: { waitting: req.params.id },
                $push: { chat: body._id }
            }, { new: true }).exec((err) => {
                if (err) throw err
                console.log('save');
            })
        }
    } else {
        res.status(403).send({ err: "Au" })
    }
})


//Denied request

router.post('/denied-request/:id', async (req, res) => {
    const id = { _id: req.params.id } // id of the requestChat
    const authId = req.authenticateUser._id // id user after login
    const user = await User.findById(authId) // info user after login
    const convertUserToJson = JSON.parse(JSON.stringify(user))
    console.log(convertUserToJson.requests);
    console.log(id);
    let check = convertUserToJson.requests.includes(req.params.id) // check 
    console.log(check);
    let chatRequestInfo = await RequestChat.findById(id)
    if (check) {
        User.findByIdAndUpdate(authId, {
            $pull: { requests: req.params.id }
        }, { new: true }).exec((err) => {
            if (err) throw err
        })
        User.findByIdAndUpdate(chatRequestInfo.user, {
            $pull: { waitting: req.params.id }
        }, { new: true }).exec((err, result) => {
            if (err) throw err
            res.json(result)
        })
    } else {
        res.status(403).send({ err: "Au" })
    }
})


module.exports = router