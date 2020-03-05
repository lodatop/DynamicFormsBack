var express = require('express');
var router = express.Router();;
var user = require('../helpers/user');

const middleware = require('../middlewares/auth');

router.use('/', middleware.isLoggedIn, function(req, res, next) {
  next();
})

router.post('/update', function(req, res, next) {
    user.updateUser(req.body.username, req.body.name, req.body.email, req.user.id_user).then((rows) => {
      if (rows) {
        res.send(rows)
      }
    }).catch((err) => console.log(err))
  });

module.exports = router;