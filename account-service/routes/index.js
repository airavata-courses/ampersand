const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// import Utils from '../Utilities';
// let host_url = Utils.host_url

const host_url = require('../Utilities.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const TOKEN_SECRET = 'SECRET';

router.get('/auth/google',
 passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback',
 passport.authenticate('google', { failureRedirect: '/error' }),
 function(req, res) {
   const token = jwt.sign({ id: req.user.sub, name: req.user.name }, TOKEN_SECRET, {
     expiresIn: 60 * 60,
   });
   res.cookie('auth', token, { httpOnly: true });
   res.redirect(host_url.host_url+":30000/dashboard");
});

module.exports = router;
