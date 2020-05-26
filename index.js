const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

const app = express();

// Passport local Config
require('./config/passport')(passport);
// Passport twitter Config
require('./config/passport-twitter-init')(passport)

// Passport facebook Config
require('./config/passport-facebook-init')(passport)

// Passport google Config
require('./config/passport-google-init')(passport)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');


// register a helper
exphbs.create({}).handlebars.registerHelper('if_not_empty', function(a, opts) {
    if (a.length > 0) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
})


// middlewares
// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Express 
let sess = {
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(
    session(sess)
);

// connect flash
app.use(flash())

// passport middleware
app.use(passport.initialize());
app.use(passport.session());




// global variables
app.use((req, res, next) => {
    res.locals.success = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


// static folder
app.use(express.static(path.join(__dirname, 'public')));

// auth route
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

// index route
const userRoute = require('./routes/user');
app.use('/', userRoute);


const port = process.env.PORT || 3232;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});