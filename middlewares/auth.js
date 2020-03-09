module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.send({
          status: 400,
          message: 'not authenticated'
        });
      }
    },
    isNotLoggedIn: (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.send({
          status: 400,
          message: 'already logged in'
        });
      }
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