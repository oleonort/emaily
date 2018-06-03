// next is a function to call when middleware finishes the work to proceed to next middleware
module.exports = (request, response, next) => {
  if (request.user && request.user.credits < 1) {
    return response.status(403).send({ error: 'Not enough credits.' });
  }

  next();
};
