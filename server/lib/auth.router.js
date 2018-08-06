const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./auth.controller')

// Setting up the passport middleware for each OAuth provider
const twitterAuth = passport.authenticate('twitter')
const googleAuth = passport.authenticate('google', { scope: ['profile'] })
const facebookAuth = passport.authenticate('facebook')
const githubAuth = passport.authenticate('github')

// Custom middleware allows for attaching socket id to the session.
// With the socket id attached, the right user info can be sent to 
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}

// Routes triggered by the React client
router.get('/twitter', addSocketIdtoSession, twitterAuth)
router.get('/google', addSocketIdtoSession, googleAuth)
router.get('/facebook', addSocketIdtoSession, facebookAuth)
router.get('/github', addSocketIdtoSession, githubAuth)

// Routes triggered by callbacks from OAuth providers once 
// the user has authenticated successfully
router.get('/twitter/callback', twitterAuth, authController.twitter)
router.get('/google/callback', googleAuth, authController.google)
router.get('/facebook/callback', facebookAuth, authController.facebook)
router.get('/github/callback', githubAuth, authController.github)

module.exports = router;