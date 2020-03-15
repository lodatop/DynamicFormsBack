var express = require('express');
var router = express.Router();
var menuHelper = require('./../helpers/menu');

const middleware = require('../middlewares/auth');

router.get('/logout', middleware.isLoggedIn, function(req, res) {
  req.session.destroy(function (err) {
    res.send(req.user);
  });
});

router.get('/dashboard', function(req,res) {
    menuHelper.getMenusWithoutParent().then((results) => {
       res.send(results)
   }).catch((err) => res.send(err))
})


module.exports = router;