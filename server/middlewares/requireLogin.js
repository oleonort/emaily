// next is a function to call when middleware finishes the work to proceed to next middleware
module.exports = (request, response, next) => {
  if (!(request.user && request.user.googleId)) {
    return response.status(401).send({ error: 'User must be logged in.' });
  }

  next();
};
