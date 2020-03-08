var express = require('express');
var router = express.Router();
var input = require('./../helpers/input');

const middleware = require('../middlewares/auth');

router.get('/input', function(req,res) {
    input.getAllInputs().then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/input', middleware.isAdmin, function(req,res) {
    input.insertInput(req.body.label, req.body.type).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

module.exports = router;