const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user
            User.findOne({
                    raw: true,
                    where: {
                        email
                    }
                })
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'That email does not exist' })
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Incorrect password' })
                        }
                    })

                })
                .catch((err) => {
                    console.log(err);
                })
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
                raw: true,
                where: { id }
            })
            .then((user) => {
                done(null, user);
            });
    });
}