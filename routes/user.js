const express = require('express')
const router = express.Router();
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');


// signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    const { email, full_name, password, repeat_password } = req.body;

    let errors = [];

    if (!full_name || !email || !password || !repeat_password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != repeat_password) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 4) {
        errors.push({ msg: 'Password must be at least 4 characters' });
    }

    if (errors.length > 0) {
        res.render('signup', {
            errors,
            full_name,
            email,
            password,
            repeat_password
        });
    } else {
        User.findAll({
                raw: true,
                where: {
                    email
                }
            })
            .then(users => {
                if (users.length > 0) {
                    errors.push({
                        msg: 'Email already exists!'
                    });
                    res.render('signup', {
                        errors,
                        full_name,
                        email,
                        password,
                        repeat_password
                    });
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            User.create({
                                    email,
                                    full_name,
                                    password: hash
                                })
                                .then(() => {
                                    req.flash('success', "Your registration was successful");
                                    res.redirect('/signup');
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }

});

router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router