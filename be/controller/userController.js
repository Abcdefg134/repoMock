const express = require('express')
const router = express.Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const constants = require('../constants')
const RequestChat = require('../model/RequestChat')
const WaittingAccept = require('../model/WaittingAccept')
const mongoose = require('mongoose')
const { json } = require('express')
//Get all User
router.get('/all-user', (req, res) => {
    if (req.authenticateUser._id) {
        return User.find().exec((err, users) => {
            if (err) throw err
            res.json(users)
        })
    }
})
//Get user by Id
router.get('/:id', async (req, res) => {
    const authId = req.authenticateUser._id
    //const check = await User.findById(authId)
    //console.log(check);
    const id = { _id: req.params.id }
    if (!id) {
        res.status(400).send({ messError: 'not found id' })
    } else if (authId == req.params.id) {
        User.findById(id).populate([
            {
                path: 'requests',
                populate: [
                    {
                        path: 'user',
                        select: ['name,avatar']
                    },
                    {
                        path: 'chatID',
                        select: 'name'
                    }
                ],
                select:"updateAt",
                options:{
                    sort:{'updateAt':-1}
                }
            },
            {
                path: 'waitting',
                populate: [
                    {
                        path: 'user',
                        select: ['name,avatar']
                    },
                    {
                        path: 'chatID',
                        select: 'name'
                    }
                ],
                select:"updateAt",
                options:{
                    sort:{'updateAt':-1}
                }
            },
            {
                path: 'chat',
                populate: [{
                    path: 'members',
                    select: ['name', 'email']
                }
                ],select:"updateAt",
                options:{
                    sort:{'updateAt':-1}
                }
            }
        ]).exec((err, user) => {
            if (err) throw err
            res.json(user)
        })
    } else {
        res.status(401).send({ "err": "Au" })
    }

})

//Update Password

router.post('/change-pass', async (req, res) => {
    const authID = req.authenticateUser._id
    let body = {
        password: req.body.password,
        newPassword: req.body.newPassword
    }
    if (authID) {
        const saltRound = 10
        let newPasswordHash = await bcrypt.hash(req.body.newPassword, saltRound)
        body.newPassword = newPasswordHash
        let updatePassword = {
            password: body.newPassword
        }
        const currentUser = await User.findById(authId)
        checkPass = bcrypt.compareSync(body.currentPassword, currentUser.password)
        if (checkPass) {
            User.findByIdAndUpdate(authId, updatePassword, { new: true }, function (err, result) {
                if (err) return res.send(err)
                res.json(result)
            });
        } else {
            return res.status(400).send({ messError: 'abc' })
        }
    } else {
        res.status(400).send({ err: "You must login" })
    }
})
//Change Name
router.post('/change-name', (res, rep) => {
    const authId = req.authenticateUser._id
    const update = {
        name: req.body.name,
    }
    if (authId) {
        User.findByIdAndUpdate(authId, update, { new: true }, function (err, result) {
            if (err) return res.send(err)
            res.json(result)
            console.log("abc");
        })
    } else {
        res.status(400).send({ err: "You must login" })
    }
})

// Update avatar

router.post('/avatar', constants.upload.single('avatar'), (req, res) => {
    let authId = req.authenticateUser._id;
    let update = req.body;
    update.avatar = req.file.originalname
    User.findByIdAndUpdate(authId, update, { new: true }, function (err, result) {
        if (err) return res.send(err)
        res.json(result)
    });
})

//Request new chat

router.post('/request-chat/:id', async (req, res) => {
    const id = { _id: req.params.id } // id of user1
    const authId = req.authenticateUser._id // id of user after login who reuqest to user1
    const check = await User.findById(id)
    if (check) {
        let requestChat = await new RequestChat({
            _id: new mongoose.Types.ObjectId(),
            user: authId,
            chatID: req.body.chatID
        })
        let waittingAccept = new WaittingAccept({
            _id: requestChat._id,
            user: id,
            chatID: req.body.chatID
        })
        requestChat.save((err) => {
            if (err) throw err
            console.log('requests saved');
        })
        waittingAccept.save((err) => {
            if (err) throw err
            console.log('waitting saved');
        })
        User.findByIdAndUpdate(id, {  // push to field requests of user1
            $push: { requests: requestChat._id }
        }, { new: true }).exec((err) => {
            if (err) return res.status(404).send({ 'err': err })
        })
        User.findByIdAndUpdate(authId, { // push to field requests of authID
            $push: { waitting: waittingAccept._id }
        }, { new: true }).exec((err, result) => {
            if (err) return res.status(404).send({ 'err': err })
            res.json(result)
        })
    }
})
module.exports = router

