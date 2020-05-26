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
            callbackURL: "http://127.0.0.1:3232/auth/twitter/callback"
        }, (token, tokenSecret, profile, cb) => {
            // console.log(profile);
            User.findOrCreate({
                    where: { twitterId: profile.id },
                    defaults: {
                        full_name: profile.displayName,
                        twitterId: profile.id,
                    },
                    raw: true,
                })
                .spread((user, created) => {
                    console.log(user);
                    return cb(null, user);
                })
        })
    );

    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        User.findOne({
                raw: true,
                where: { id }
            })
            .then((user) => {
                cb(null, user);
            });
    });
}