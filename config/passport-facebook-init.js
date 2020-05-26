const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');


module.exports = (passport) => {
    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:3232/auth/facebook/callback"
        }, (accessToken, refreshToken, profile, done) => {

        })
    )
}