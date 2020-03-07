module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      //req.session.oldUrl = req.url;
      //res.redirect('/user/login');
    },
    isNotLoggedIn: (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next();
      }
      //res.redirect('/');
    },
    isAdmin: (req, res, next) => {
      if (req.isAuthenticated()) {
        if(req.user.admin_user){
          return next();
        } else {
          res.send({
            status: 403
          });
        }
      } else {
        res.send({
          status: 403
        });
      }
    }
  }