const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const PORT = 1998;
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))
const authenMiddleware = require('./helper/authenMiddleware')
const UserRouter = require('./controller/userController')
const AuthRouter = require('./controller/authController');
const GroupChatRouter = require('./controller/groupChatController')
const MessageRouter = require('./controller/messageController')
const RequestChatRouter = require('./controller/requestChatController')
const WaittingRouter = require('./controller/waittingAcceptController')
var mongoDB = 'mongodb://localhost:27017/projectChat'
mongoose.connect(mongoDB, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
app.use('/', AuthRouter)
app.use('/user', authenMiddleware.authenticateJWT, UserRouter)
app.use('/chat', authenMiddleware.authenticateJWT, GroupChatRouter)
app.use('/message', authenMiddleware.authenticateJWT, MessageRouter)
app.use('/request', authenMiddleware.authenticateJWT, RequestChatRouter)
app.use('/watting', authenMiddleware.authenticateJWT, WaittingRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(PORT, () => { console.log("Server started on http://localhost:" + PORT); })
module.exports = app