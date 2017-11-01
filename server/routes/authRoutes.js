const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (requst, response) => {
    // logout is attached automatically by passport
    requst.logout();
    response.send(requst.user);
  });

  app.get('/api/current-user', (requst, response) => {
    response.send(requst.user);
  });
};
