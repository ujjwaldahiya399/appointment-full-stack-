const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', 'views');

const homeRoutes = require('./routes/home');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);

sequelize.sync()
.then( result => {
    app.listen(3000);
})
.catch( err => {
    console.log(err);
})


