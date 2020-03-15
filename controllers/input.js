var express = require('express');
var router = express.Router();
var inputHelper = require('./../helpers/input');

const middleware = require('../middlewares/auth');

router.get('/', function(req,res) {
    inputHelper.getAllInputs().then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/', middleware.isAdmin, function(req,res) {
    const { label, type } = req.body;
    inputHelper.insertInput(label, type).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

module.exports = router;