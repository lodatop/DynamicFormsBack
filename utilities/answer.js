var db = require('./pool');
var properties = require('./prop-reader');
var shortid = require('shortid');

var pool = db.getPool();

module.exports.insertAnswers = (queries, user_id) => {
   for(let i in queries){
       queries[i].query = properties.get('createAnswer')
       queries[i].queryParams[2] = new Date().toLocaleString().slice(0,10)
       queries[i].queryParams[3] = user_id
   }
   return new Promise ((resolve,reject) => {
    executeTransaction(queries).then((results) => {
          console.log(results)
          resolve(results)
      }).catch(error => {
      reject(error)
    })
   })
}

function queryConnection(connection, query, queryParams) {
  return new Promise((res,rej) => {
    connection.query(query, queryParams, function(error,rows){
        if (error)
            rej(error);
        res(rows)
    })
  })
}

function executeTransaction(queries) {
    
    let results = []

    return new Promise ((resolve,reject) =>{
        pool.getConnection(function(err, connection){
            if (err) rej(err);
            connection.beginTransaction(function (err) {
                if (err) throw err
            
                console.log("Starting transaction")
            
                queries
                  .reduce(function (sequence, queryToRun) {
                    return sequence.then(function () {
                      /* pass your query and connection to a helper function and execute query there */
                      return queryConnection(
                        connection,
                        queryToRun.query,
                        queryToRun.queryParams,
                      ).then(function (res) {
                        /* Accumulate resposes of all queries */
                        results = results.concat(res)
                      })
                    }).catch(function (error) {
                      reject(error)
                    })
                  }, Promise.resolve())
                  .then(function () {
                    connection.commit(function (err) {
                      if (err) {
                        connection.rollback(function () {
                          throw err
                        })
                      }
                      console.log('Transactions were completed!')
                      /* release connection */
                      connection.release()
                      /* resolve promise with all results */
                      resolve({ results })
                    })
                  })
                  .catch(function (err) {
                    console.log('Transaction failed!')
                    connection.rollback(function () {
                      console.log('Abort Transaction !!!')
                      throw err
                    })
                  })
              })
        })
    })
}
