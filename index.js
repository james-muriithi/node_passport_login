const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// middlewares
// body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// signup
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});


const port = process.env.PORT || 3232;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});