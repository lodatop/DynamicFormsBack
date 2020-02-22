module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.session.oldUrl = req.url;
      res.redirect('/user/login');
    },
    isNotLoggedIn: (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');
    }
  }