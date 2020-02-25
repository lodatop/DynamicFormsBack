var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('./../utilities/user');

const middleware = require('../middleware');


router.use('/', middleware.isNotLoggedIn, function(req, res, next) {
  next();
})


router.post('/register', function(req, res, next) {
  var us = user.registerUser(req.body.name, req.body.username, req.body.email, req.body.password).then((rows) => {
    if (rows) {
      res.send(rows)
    }  else {
      res.send('error papito') //enviar error
    }
  }).catch((err) => console.log(err))
});

router.post('/registerAdmin', function(req, res, next) {
    var us = user.registerAdmin(req.body.name, req.body.username, req.body.email, req.body.password).then((rows) => {
      if (rows) {
        res.send(rows)
      }  else {
        res.send('error papito')
      }
    }).catch((err) => console.log(err))
  });

router.post('/login', passport.authenticate('local-signin', {
  failureRedirect: '/user/login',
  failureFlash: true,
}), function(req, res, next) {
    res.send(req.user)
});

module.exports = router;