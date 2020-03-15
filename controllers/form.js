var express = require('express');
var router = express.Router();
var formHelper = require('./../helpers/form');
var inputHelper = require('./../helpers/input');
var answerHelper = require('../helpers/answer');

const middleware = require('../middlewares/auth');

router.get('/', middleware.isLoggedIn, function(req,res) {
    formHelper.getAllForms().then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:form', middleware.isLoggedIn, function(req,res) {
    const { form } = req.params;
    formHelper.getForm(form).then((results) => {
        res.send({
            data: {
                form: results
            }
        })
    }).catch((err) => res.send(err))
})

router.delete('/:form/delete', function(req,res) {
    const { form } = req.params;
    formHelper.deleteForm(form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:form/input', middleware.isLoggedIn, function(req,res) {
    const { form } = req.params;
    inputHelper.getInputByForm(form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:form/input', middleware.isAdmin, function(req,res) {
    const { input } = req.body;
    const { form } = req.params;
    inputHelper.insertFormInput(input, form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:form/answer', function(req,res) {
    const { form } = req.params;
    const { id_user } = req.user;
    answerHelper.getUserForm(form, id_user).then((results)=>{
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/:form/answer', middleware.isLoggedIn, function(req,res) {
    const { form } = req.params;
    const { id_user } = req.user;
    const { data } = req.body;
    answerHelper.insertUserForm(form, id_user, JSON.stringify(data)).then((results)=>{
        form.updateForm(req.params.form).then(() => {
            res.send(results)
        }).catch((error) => res.send(error))
    }).catch((err) => {
        res.send(err)
    })
})

router.delete('/:form/answer/delete', function(req,res) {
    const { form } = req.params;
    const { id_user } = req.user;
    answerHelper.deleteUserForm(form, id_user).then((results)=>{
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/:form/input/delete', function(req,res) {
    const { form } = req.params;
    const { input } = req.body;
    inputHelper.deleteFormInput(form, input).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})


module.exports = router;