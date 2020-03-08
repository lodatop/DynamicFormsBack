var express = require('express');
var router = express.Router();
var menu = require('./../helpers/menu');
var form = require('./../helpers/form');

const middleware = require('../middlewares/auth');


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


module.exports = router;