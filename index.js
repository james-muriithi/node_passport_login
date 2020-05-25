const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');


// register a helper
exphbs.create({}).handlebars.registerHelper('if_not_empty', function(a, opts) {
    if (!a) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
})


// middlewares
// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
// connect flash
app.use(flash())


// global variables
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


// static folder
app.use(express.static(path.join(__dirname, 'public')));


const userRoute = require('./routes/user');
app.use('/', userRoute);


const port = process.env.PORT || 3232;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});