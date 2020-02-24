var mysql = require('mysql');
var pool;
module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool = mysql.createPool({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'masterkey',
        database : 'formsAndStuff'
      });
      return pool;
    }
};