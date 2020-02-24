var db = require('./pool');
var properties = require('./prop-reader');
var shortid = require('shortid');

var pool = db.getPool();

module.exports.insertMenu = (title, description) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) rej(err);
            con.query(properties.get('createMenu'), [shortid.generate(), title, description], function(error,rows){
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
            con.query(properties.get('selMenus'), function(error,rows){
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
            con.query(properties.get('selMenu'), [id], function(err,rows){
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
            con.query(properties.get('delMenu'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.insertOption = (title, menuId, description, type, parent) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) rej(err);
            con.query(properties.get('createOption'), [shortid.generate(), menuId, title, description, type, parent], function(error,rows){
                if (error)
                    rej(error);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getOptionsByMenu = (menuId) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('selOptionsByMenu'), [menuId], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getOptionsByParent = (parent) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('selOptionsByParent'), [parent], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.deleteOption = (id) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('delOption'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.insertInput = (formId, label, type) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) rej(err);
            con.query(properties.get('createInput'), [shortid.generate(), formId, label, type], function(error,rows){
                if (error)
                    rej(error);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getInputsByOption = (formId) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('selInputsByOption'), [formId], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.deleteInput = (id) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('delInput'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}
