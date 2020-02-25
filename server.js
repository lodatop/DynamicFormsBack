require('dotenv').config()

var express = require("express"),
    app = express(),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


app.use(cookieParser());
app.use(session({
  secret: 'penene',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

//routers declarar
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

require('./utilities/passport');

//routers use
app.use('/', indexRouter);
app.use('/user', userRouter);

//cors

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })