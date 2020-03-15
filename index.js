require('dotenv').config()

const express = require("express"),
    app = express(),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cors = require('cors');

app.use(express.json())
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

var indexRouter = require('./controllers/index');
var userRouter = require('./controllers/user');
var profileRouter = require('./controllers/profile');
var menuRouter = require('./controllers/menu');
var formRouter = require('./controllers/form');
var inputRouter = require('./controllers/input');

require('./helpers/passport');

app.use(cors({
  origin: true,
  methods: 'POST, PUT, GET, DELETE, OPTIONS, PATCH',
  allowedHeaders: 'Accept, Content-Type, Accept-Encoding, Content-Length, Authorization',
  credentials: true
}));

app.use('/', indexRouter);
app.use('/input', inputRouter);
app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/menu', menuRouter);
app.use('/form', formRouter);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })