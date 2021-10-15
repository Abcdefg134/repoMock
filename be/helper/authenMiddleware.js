const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const authenticateJWT = (req, res, next) => {
    //console.log(req);
    const token = req.cookies.token
    //console.log(token);
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
            if (err) {
                return res.status(403).send({ err: "token sai" });
            }
            console.log(payload);
            let user = await User.findById(payload._id).exec()
            req.authenticateUser = user
            next();
        })
    } else {
        res.status(401).send({ err: "You must login" });
    }
}

module.exports = { authenticateJWT }

