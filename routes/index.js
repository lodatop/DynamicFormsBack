var express = require('express');
var router = express.Router();
var passport = require('passport');

const middleware = require('../middleware');

router.get('/menu', function(req,res) {
    //traerse todos los menus
})

router.post('/menu', function(req,res) {
    //hacer un menu
})

router.get('/:menu/delete', function(req,res){
    //borrar un menu
})

router.get('/:menu/form', function(req,res) {
    //traerse los forms del menu
})

router.post('/:menu/form', function(req,res) {
    //hacer un form en el menu
})

router.post('/:menu/:form/delete', function(req,res) {
    //borrar un form
})

router.get('/:menu/:form/input', function(req,res) {
    //traerse inputs de un form
})

router.post('/:menu/:form/input', function(req,res) {
    //crear un input en un form
})

router.post('/:menu/:form/answer', function(req,res) {
    //crear respuesta q seria una transaccion de queries
})

module.exports = router;