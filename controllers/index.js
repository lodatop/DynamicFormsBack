var express = require('express');
var router = express.Router();
var passport = require('passport');
var menu = require('./../helpers/menu');
var form = require('./../helpers/form');
var input = require('./../helpers/input');
var answer = require('../helpers/answer');
var user = require('../helpers/user');

const middleware = require('../middlewares/auth');

router.get('/user', function(req,res) {
    res.send(req.user)
})

router.get('/stats', function(req,res) {
    //get todays activity
})

router.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
      res.send(req.user);
    });
  });
  
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

router.get('/menu', function(req,res) {
     menu.getAllMenus().then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/menu', middleware.isAdmin, function(req,res) {
    menu.insertMenu(req.body.title,req.body.description,req.body.parent).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/dashboard', function(req,res) {
    menu.getMenusWithoutParent().then((results) => {
       res.send(results)
   }).catch((err) => res.send(err))
})

router.get('/:menu', async function(req,res) {
    var menus = await menu.getMenusByParent(req.params.menu)
    var forms = await form.getFormByMenu(req.params.menu)

    res.send({ data: {menus: menus, forms: forms}})
})

router.post('/:menu/menu', middleware.isAdmin, async function(req,res) {
    menu.insertMenu(req.body.title,req.body.description,req.params.menu).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})


router.get('/:menu/delete', middleware.isAdmin, function(req,res){
    menu.deleteMenu(req.params.menu).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:menu/form', middleware.isAdmin, function(req,res) {
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

router.post('/:menu/:form/input', middleware.isAdmin, function(req,res) {
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

router.post('/:menu/:form/answer', middleware.isLoggedIn, function(req,res) {
    answer.insertUserForm(req.params.form, req.user.id_user, JSON.stringify(req.body.data)).then((results)=>{
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

router.post('/:menu/:form/input/delete', function(req,res) {
    input.deleteFormInput(req.params.form, req.body.input).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})


module.exports = router;