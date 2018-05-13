const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));

  app.get(
    '/auth/google/callback',
     passport.authenticate('google'),
     (requst, response) => {
       response.redirect('/surveys');
     }
   );

  app.get('/api/logout', (requst, response) => {
    // logout is attached automatically by passport
    requst.logout();
    response.redirect('/');
  });

  app.get('/api/current_user', (requst, response) => {
    response.send(requst.user);
  });
};
