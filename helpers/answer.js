var db = require('./pool');
var properties = require('./prop-reader');
var shortid = require('shortid');

var pool = db.getPool();

module.exports.insertUserForm = (formId, userId, data) => {
  let date = new Date().toLocaleString().slice(0,10)
  return new Promise ((res,rej) =>{
    pool.getConnection(function(err, con){
        if (err) rej(err);
        con.query(properties.get('insertUserForm'), [userId, formId, date, data], function(error,rows){
            if (error)
                rej(error);
            res(rows)
            con.release()
        }
    )})
  })
}

module.exports.getUserForm = (formId, userId) => {
  return new Promise ((res,rej) =>{
    pool.getConnection(function(err, con){
        if (err) rej(err);
        con.query(properties.get('getUserForm'), [userId, formId], function(error,rows){
            if (error)
                rej(error);
            res(rows)
            con.release()
        }
    )})
  })
}

module.exports.deleteUserForm = (formId, userId) => {
  return new Promise ((res,rej) =>{
    pool.getConnection(function(err, con){
        if (err) rej(err);
        con.query(properties.get('deleteUserForm'), [userId, formId], function(error,rows){
            if (error)
                rej(error);
            res(rows)
            con.release()
        }
    )})
  })
}
