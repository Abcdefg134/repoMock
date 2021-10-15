const express = require('express')
const WattingAccept = require('../model/WattingAccept')
const router = express.Router()


//Delete watting

router.delete('/delete/:id', async (req, res) => {
    const id = { _id: req.params.id } // id of wattingAccept
    const authId = req.authenticateUser._id
    const wattingAccept = await WattingAccept.findById(id)
    const check = Boolean(wattingAccept.user == authId)
    if (check) {
        WattingAccept.findByIdAndDelete(id, (err) => {
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