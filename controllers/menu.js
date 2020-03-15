var express = require('express');
var router = express.Router();
var menuHelper = require('./../helpers/menu');
var formHelper = require('./../helpers/form');

const middleware = require('../middlewares/auth');


router.get('/', function(req,res) {
    menuHelper.getAllMenus().then((results) => {
       res.send(results)
   }).catch((err) => res.send(err))
})

router.post('/', middleware.isAdmin, function(req,res) {
    const { title, description, parent } = req.body;
    menuHelper.insertMenu(title, description, parent).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.get('/:menu', async function(req,res) {
    const { menu } = req.params;
    let submenus = await menuHelper.getMenusByParent(menu)
    let forms = await formHelper.getFormByMenu(menu)
    let menuData = await menuHelper.getMenu(menu)

    res.send({ data: {
        submenus: submenus, 
        forms: forms, 
        menu: menuData
    }})
})


router.delete('/:menu', middleware.isAdmin, function(req,res){
    const { menu } = req.params;
    menuHelper.deleteMenu(menu).then((results) => {
        res.send(results)
    }).catch((err) => res.send(err))
})

router.post('/:menu/form', middleware.isAdmin, function(req,res) {
    const { title, description } = req.body;
    const { menu } = req.params;
    formHelper.insertForm(title, menu, description).then((results) => {
        res.send({
            data: {
                id: results
            }
        })
    }).catch((err) => res.send(err))
})


module.exports = router;