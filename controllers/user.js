var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('../helpers/user');

const middleware = require('../middlewares/auth');


router.use('/', middleware.isNotLoggedIn, function(req, res, next) {
  next();
})


router.post('/register', function(req, res, next) {
  var us = user.registerUser(req.body.name, req.body.username, req.body.email, req.body.password, req.body.age, req.body.gender).then((rows) => {
    if (rows) {
      res.send({
        status: 200,
        message: "registered succesfully as user",
        user: rows})
    }
  }).catch((err) => console.log(err))
});

router.post('/registerAdmin', function(req, res, next) {
    var us = user.registerAdmin(req.body.name, req.body.username, req.body.email, req.body.password, req.body.age, req.body.gender).then((rows) => {
      if (rows) {
        res.send({
          status: 200,
          message: "registered succesfully as admin",
          user: rows})
      }
    }).catch((err) => console.log(err))
  });

router.post('/login', passport.authenticate('local-signin'), function(req, res, next) {
  if(typeof req.user !== undefined){
    res.send({
      status: 200,
      message: "login succesfully",
      data: req.user})
  }  
});

module.exports = router;