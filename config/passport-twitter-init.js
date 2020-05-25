const TwitterStrategy = require('passport-twitter').Strategy
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');


module.exports = (passport) => {
    passport.use(
        new TwitterStrategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: "http://127.0.0.1:3232/"
        }, (token, tokenSecret, profile, cb) => {
            console.log(token);
            return cb(err, user);
        })
    )
}