var express = require('express');
var router = express.Router();
var form = require('./../helpers/form');
var input = require('./../helpers/input');
var answer = require('../helpers/answer');

const middleware = require('../middlewares/auth');


router.get('/:form', function(req,res) {
    input.getInputByForm(req.params.form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:form/delete', function(req,res) {
    form.deleteForm(req.params.form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:form/input', middleware.isAdmin, function(req,res) {
    input.insertFormInput(req.body.input, req.params.form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:form/answer', function(req,res) {
    answer.getUserForm(req.params.form, req.user.id_user).then((results)=>{
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/:form/answer', middleware.isLoggedIn, function(req,res) {
    answer.insertUserForm(req.params.form, req.user.id_user, JSON.stringify(req.body.data)).then((results)=>{
        form.updateForm(req.params.form).then((updated) => {
            res.send(results)
        }).catch((error) => res.send(error))
    }).catch((err) => {
        res.send(err)
    })
})

router.get('/:form/answer/delete', function(req,res) {
    answer.deleteUserForm(req.params.form, req.user.id_user).then((results)=>{
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/:form/input/delete', function(req,res) {
    input.deleteFormInput(req.params.form, req.body.input).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})


module.exports = router;