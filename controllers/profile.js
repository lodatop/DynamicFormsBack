var express = require('express');
var router = express.Router();
var userHelper = require('../helpers/user');
var fs = require('fs');

const middleware = require('../middlewares/auth');

router.use('/', middleware.isLoggedIn, function(req, res, next) {
  next();
})

router.get('/', middleware.isLoggedIn, function(req,res) {
  res.send({
    data: req.user
  })
})

router.put('/', middleware.isLoggedIn, function(req, res, next) {
  const {username, name, email, age, gender} = req.body;
  const { id_user } = req.user;
  userHelper.updateUser(username, name, email, age, gender, id_user).then((rows) => {
    if (rows) {
      res.send(rows)
    }
  }).catch((err) => console.log(err))
});

module.exports = router;