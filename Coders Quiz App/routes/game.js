const fs = require('fs');
const path = require('path');

const gameRoutes = (app) => {
  let goodAnswers = 0;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let fiftyFiftyUsed = false;

  const data = fs.readFileSync(path.join(__dirname, '../data/questions.json'), 'utf-8');
  const questions = JSON.parse(data).questions;

  app.get('/question', (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true, 
      })
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;

      res.json({
        question, answers
      })
    }
  });
}

module.exports = gameRoutes;