var db = require('../helpers/pool');
var properties = require('../helpers/prop-reader');
var shortid = require('shortid');

var pool = db.getPool();

module.exports.insertMenu = (title, description, parent) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) rej(err);
            var parentVar = parent;
            if(parentVar == 'none'){
                parentVar = null;
            }
            con.query(properties.get('insertMenu'), [shortid.generate(), title, description, parentVar], function(error,rows){
                if (error)
                    rej(error);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getAllMenus = () => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) rej(err);
            con.query(properties.get('getMenus'), function(error,rows){
                if (error)
                    rej(error);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getMenu = (id) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('getMenu'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getMenusByParent = (parent) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('getMenusByParent'), [parent], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.deleteMenu = (id) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('deleteMenu'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}