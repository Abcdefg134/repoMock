const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const authenMiddleware = require('../helper/authenMiddleware')
//Signup

router.post('/signup', async (req, res) => {
    if (req.body.password.length < 6) {
        return res.status(400).send({ err: 'Password phải có tối thiểu 6 ký tự' })
    } else {
        const saltRound = 10
        let passwordHash = await bcrypt.hash(req.body.password, saltRound)
        req.body.password = passwordHash
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            avatar: req.body.avatar,
            watting:[],
            chat:[],
            requests:[]
        })
        const userExist = await User.findOne({
            email: req.body.email
        })
        if (userExist) {
            return res.status(400).send({ err: 'Email already exist' })
        }
        user.save((err) => {
            if (err) throw err
            console.log('User save successfully');
        })
        res.json({ 'data': user })
    }
})

//Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email: email
    })
    let checkPass = false
    if (user) {
        checkPass = bcrypt.compareSync(password, user.password)
    }
    if (user && checkPass) {
        const accessToken = jwt.sign({ email: user.email, _id: user._id }, process.env.SECRET_KEY)
        let userInfor = {
            email: user.email,
            _id: user._id
        }
        return [
            res.status(202).cookie('token', accessToken, { httpOnly: true, expires: new Date(Date.now() + 2000 * 24 * 60 * 60 * 1000) }),
            res.json(userInfor)
        ]
    } else {
        return res.status(400).send({ err: 'Email or password incorrect' })
    }
})

//Check login
router.get('/checkLogin', authenMiddleware.authenticateJWT, (req, res) => {
    //console.log(req.cookies)

    return res.send({
        status: true,
        _id: req.authenticateUser._id
    })
})

//Load file

router.get('/uploads/:name', (req, res) => {
    const fileName = req.params.name;
    console.log('fileName', fileName);
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified'
        })
    }
    res.sendFile(path.resolve(`../server/uploads/${fileName}`))
})

module.exports = router