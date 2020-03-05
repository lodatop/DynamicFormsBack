var express = require('express');
var router = express.Router();
var passport = require('passport');
var menu = require('./../helpers/menu');
var form = require('./../helpers/form');
var input = require('./../helpers/input');
var answer = require('../helpers/answer');
var user = require('../helpers/user');

const middleware = require('../middlewares/auth');

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
  
router.post('/input', function(req,res) {
    input.insertInput(req.body.label, req.body.type).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/menu', function(req,res) {
     menu.getAllMenus().then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/menu', function(req,res) {
    menu.insertMenu(req.body.title,req.body.description,req.body.parent).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu', async function(req,res) {
    var menus = await menu.getMenusByParent(req.params.menu)
    var forms = await form.getFormByMenu(req.params.menu)

    res.send({menus: menus, forms: forms})
})

router.post('/:menu/menu', async function(req,res) {
    menu.insertMenu(req.body.title,req.body.description,req.params.menu).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})


router.get('/:menu/delete', function(req,res){
    menu.deleteMenu(req.params.menu).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:menu/form', function(req,res) {
    form.insertForm(req.body.title, req.params.menu, req.body.description).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu/:form', function(req,res) {
    input.getInputByForm(req.params.form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu/:form/delete', function(req,res) {
    form.deleteForm(req.params.form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:menu/:form/input', function(req,res) {
    input.insertFormInput(req.body.input, req.params.form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu/:form/answer', function(req,res) {
    answer.getUserForm(req.params.form, req.user.id_user).then((results)=>{
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/:menu/:form/answer', function(req,res) {
    answer.insertUserForm(req.params.form, req.user.id_user,JSON.stringify(req.body.data)).then((results)=>{
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/:menu/:form/answer/delete', function(req,res) {
    answer.deleteUserForm(req.params.form, req.user.id_user).then((results)=>{
        res.send(results)
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/:menu/:form/:input/delete', function(req,res) {
    input.deleteFormInput(req.body.input, req.params.form).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})


module.exports = router;