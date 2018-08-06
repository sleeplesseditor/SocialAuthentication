require('dotenv').config()
const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const authRouter = reuire('./lib/auth.router');
const passportInit = require('./lib/passport.init');
const { SESSION_SECRET, CLIENT_ORIGIN } = require('./config');

const app = express();

const certOptions = {
    key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/server.crt'))
}

const server = https.createServer(certOptions, app);

//Setup for passport and accept JSON objects
app.use(express.json());
app.use(passport.initialize());
passportInit();

//Accept requests from client
app.use(cors({
    origin: CLIENT_ORIGIN
}))

//saveUnitialized: true allows attaching socket id to session prior to user authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//Connecting sockets to server and adding to request for later addition to controller
const io = socketio(server);
app.set('io', io);

//Direct all requests to auth router
app.use('/', authRouter);

server.listen(process.env.PORT || 8080, () => {
    console.log('Listening...')
})