const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const indexRouter = require('./routes/index');

const app = express();
// This is here for client side to be able to talk to server side. you may want to be less permissive in production and define specific domains.
app.use(cors());

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
    })
  )

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

passport.serializeUser(function(user, cb) {
    cb(null, user);
   });
   
   passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
   });

   passport.use(new GoogleStrategy({
    clientID: '1016091856141-ogmillik21hdb1cpi5f06vg2rr3h4hmh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // code to create a user in the database goes here
    return done(null, profile);
  }
 ));

module.exports = app;
