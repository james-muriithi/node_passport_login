const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');


module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3232/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            console.log(profile);
        })
    )
}