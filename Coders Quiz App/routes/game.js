const fs = require('fs');
const path = require('path');

const gameRoutes = (app) => {
  let goodAnswers = 0;
  let isGameOver = false;
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
    } else if (isGameOver) {
      res.json({
        looser: true, 
      })
    }else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;

      res.json({
        question, answers
      })
    }
  });

  app.post('/answer/:answerIndex', (req, res) => {
    if ( isGameOver ) {
      res.json({
        looser: true, 
      })
    }

    const { answerIndex } = req.params;
    const question = questions[goodAnswers];
    const resObject = {};

    if (question.correctAnswer === +answerIndex) {
      goodAnswers++;
      resObject.correct = true;
    } else {
      isGameOver = true;
      resObject.correct = false;
    }

    resObject.goodAnswers = goodAnswers;
    res.json(resObject)
  })

  app.get('/help/friend', (req, res) => {

    if (callToAFriendUsed) {
      return res.json({
        message: 'This helper was used'
      })
    }
  
    const isAnswerKnown = Math.random() < 0.5;
    const { answers, correctAnswer } = questions[goodAnswers];
    
    callToAFriendUsed = true;

    res.json({
      message: isAnswerKnown ? `I think that the correct answer is: ${answers[correctAnswer]}` : `I don't know. Sorry!`
    })
  })

  app.get('/help/fifty', (req, res) => {

    if (fiftyFiftyUsed) {
      return res.json({
        message: 'This helper was used'
      })
    }

    fiftyFiftyUsed = true;
    
    const { answers, correctAnswer } = questions[goodAnswers];
    const wrongAnswers = answers.filter((_ , index) => index !== correctAnswer);
    wrongAnswers.splice(~~(Math.random() * wrongAnswers.length), 1);

    res.json({
      answersToRemove: wrongAnswers
    })
  })
}




module.exports = gameRoutes;