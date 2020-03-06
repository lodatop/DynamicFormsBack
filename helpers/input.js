var db = require('./pool');
var properties = require('./prop-reader');
var shortid = require('shortid');

var pool = db.getPool();

module.exports.insertInput = (label, type) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) rej(err);
            con.query(properties.get('insertInput'), [shortid.generate(), label, type], function(error,rows){
                if (error)
                    rej(error);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getAllInputs = () => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('getInputs'), function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.getInputByForm = (formId) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('getInputByForm'), [formId], function(err,rows){
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
            con.query(properties.get('deleteInput'), [id], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.insertFormInput = (inputId, formId) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) rej(err);
            con.query(properties.get('insertFormInput'), [shortid.generate(), formId, inputId], function(error,rows){
                if (error)
                    rej(error);
                res(rows)
                con.release()
            }
        )})
    })
}

module.exports.deleteFormInput = (formId, inputId) => {
    return new Promise ((res,rej) =>{
        pool.getConnection(function(err, con){
            if (err) throw err;
            con.query(properties.get('deleteFormInput'), [formId, inputId], function(err,rows){
                if (err)
                    rej(err);
                res(rows)
                con.release()
            }
        )})
    })
}
