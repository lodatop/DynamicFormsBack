var express = require('express');
var router = express.Router();
var user = require('../helpers/user');
var fs = require('fs');

const middleware = require('../middlewares/auth');

router.use('/', middleware.isLoggedIn, function(req, res, next) {
  next();
})

router.post('/update', middleware.isLoggedIn, function(req, res, next) {
    user.updateUser(req.body.username, req.body.name, req.body.email, req.body.age, req.body.gender, req.user.id_user).then((rows) => {
      if (rows) {
        res.send(rows)
      }
    }).catch((err) => console.log(err))
  });

  router.post('/picture', (req, res) => {
    const uri = req.body.uri;
    if(req.body.oldUri !== '') {
      fs.unlink(process.env.STORAGE_DIR + '/avatars/' + req.body.oldUri, err => {
        if(err) console.log(err);
        user.changePictureUrl(req.user.id_user, uri);
      })
    }
    console.log(uri);
    fs.writeFile(process.env.STORAGE_DIR + '/avatars/' + uri, req.body.base64, 'base64', err => {
      if(err) {
        console.log(err);
        res.status(500).send({
          status: 500,
          message: 'Could not Upload Image'
        })
      } else {
        res.status(200).send({
          status: 200,
          message: 'Image Uploaded'
        })
      }
    });
  })
  
  router.get('/picture/:uri', (req, res) => {
    let uri = req.params.uri;
    console.log('here')
    res.setHeader("Content-Type", "image/png");
    fs.createReadStream('assets/avatars/' + uri).pipe(res)
  })
module.exports = router;