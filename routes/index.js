var express = require('express');
var router = express.Router();
var passport = require('passport');
var quizzes = require('./../utilities/quizzes');
var answer = require('./../utilities/answer');
var user = require('./../utilities/user');

const middleware = require('../middleware');

/*
router.use('/', middleware.isLoggedIn, function(req, res, next) {
    next();
})
*/

router.get('/user', function(req,res) {
    res.send(req.user)
})

router.post('/user', function(req,res) {
    user.updateUser(req.body.username, req.body.name, req.body.email, req.user.id_user).then((results) => {
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

router.get('/stats', function(req,res) {
    //get todays activity
})

router.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
      res.send(req.user);
    });
  });
  

router.get('/menu', function(req,res) {
    quizzes.getAllMenus().then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/menu', function(req,res) {
    quizzes.insertMenu(req.body.title,req.body.description).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu', function(req,res) {
    quizzes.getMenu(req.params.menu).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu/delete', function(req,res){
    quizzes.deleteMenu(req.params.menu).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu/option', function(req,res) {
    quizzes.getOptionsByMenu(req.params.menu).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:menu/option', function(req,res) {
    quizzes.insertOption(req.body.title, req.params.menu, req.body.description, req.body.type, req.body.parent).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu/:option/delete', function(req,res) {
    quizzes.deleteForm(req.params.option).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu/:option/option', function(req,res) {
    quizzes.getOptionsByParent(req.params.option).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu/:option/form', function(req,res) {
    quizzes.getInputsByOption(req.params.option).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:menu/:option/form/input', function(req,res) {
    quizzes.insertInput(req.params.option, req.body.label, req.body.type).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:menu/:form/answer', function(req,res) {
    answer.insertAnswers(req.body, req.user.id_user).then((results)=>{
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router;