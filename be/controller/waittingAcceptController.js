const express = require('express')
const WaittingAccept = require('../model/WaittingAccept')
const router = express.Router()


//Delete waitting

router.delete('/delete/:id', async (req, res) => {
    const id = { _id: req.params.id } // id of waittingAccept
    const authId = req.authenticateUser._id
    const waittingAccept = await WaittingAccept.findById(id)
    const check = Boolean(waittingAccept.user == authId)
    if (check) {
        WaittingAccept.findByIdAndDelete(id, (err) => {
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