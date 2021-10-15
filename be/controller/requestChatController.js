const express = require('express')
const router = express.Router()
const RequestChat = require('../model/RequestChat')
const User = require('../model/User')

//Delete request

router.delete('/delete/:id', async (req, res) => {
    const id = { _id: req.params.id } // id of reuestChat
    const authId = req.authenticateUser._id // id of user after login
    const searchUser = await User.findById(authId)
    const check = searchUser.requests.includes(id)
    if (check) {
        RequestChat.findOneAndDelete(id, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ 'mess': "Deleted" + id })
            }
        })
    } else {
        res.status(401).send({ 'err': "Unauthorized" })
    }
})

module.exports = router