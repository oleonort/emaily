const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (request, response) => {
    response.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (request, response) => {
    const { title, subject, body, recipients } = request.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(recipientEmail  => ({ email: recipientEmail.trim() })),
      _user: request.user.id,
      dateSent: Date.now()
    });

    // Sending mail with 3rd party service
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      request.user.credits -= 1;
      const user = await request.user.save();

      response.send(user);
    } catch (error) {
      response.status(422).send(error);
    }
  });
};
