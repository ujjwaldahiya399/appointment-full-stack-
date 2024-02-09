const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const db = require('./util/database');
const app = express();

db.execute('SELECT * FROM products').then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/home', homeRoutes);

app.listen(3000);