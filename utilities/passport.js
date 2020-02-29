var passport = require('passport');
var LocalStrategy = require('passport-local');
var db = require('./pool');
var properties = require('./prop-reader');
var bcrypt = require('bcrypt');

var pool = db.getPool();

passport.serializeUser(function(user, done) {
    
    done(null, user.id_user);
});

passport.deserializeUser(function(id, done) {
    pool.getConnection(function(err, con){
        if(err) throw err;

        con.query(properties.get('selUser'), [id], function(error, rows){
            
            done(error, rows[0]);
            con.release();
        })
})});

passport.use('local-signin', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
},
function(req, username, password, done) {
    pool.getConnection(function(err, con){
        if(err) throw err;
        con.query(properties.get('selUserByUsername'),[username],function(err,rows){
            con.release();
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false);
            } 
            if(bcrypt.compareSync(password, rows[0].password_user))
                return done(null, rows[0]);
            

            return done(null, false);			
        
        });
    })
}));
