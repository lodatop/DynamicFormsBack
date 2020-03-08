var express = require('express');
var router = express.Router();
var passport = require('passport');
var menu = require('./../helpers/menu');
var form = require('./../helpers/form');
var input = require('./../helpers/input');
var answer = require('../helpers/answer');
var user = require('../helpers/user');

const middleware = require('../middlewares/auth');

router.get('/user', function(req,res) {
    res.send(req.user)
})

router.get('/stats', function(req,res) {
    //get todays activity
})

router.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
      res.send(req.user);
    });
  });

router.get('/dashboard', function(req,res) {
    menu.getMenusWithoutParent().then((results) => {
       res.send(results)
   }).catch((err) => res.send(err))
})


module.exports = router;