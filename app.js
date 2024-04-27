var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var app = express();
// start db
const db = require("./Helpers/database");
db.authenticate()
.then((result) => {
  console.log("Connection established.");
})
.catch((error) => {
  console.log("Unable to connect to db: ", error);
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  // 👇️ specify CORS headers to send 👇️
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use('/', require('./routes/index'));
//app.use('/users', usersRouter);
app.use(require('./Modules/User/Routes'));
app.use(require('./Modules/Cliente/Routes'));
app.use(require('./Modules/Cita_medica/Routes'));

module.exports = app;
