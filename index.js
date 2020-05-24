const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

// middlewares
// body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// static folder
app.use(expresss.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 3232;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});