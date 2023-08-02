const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

router.get('/', async (req, res) => {
  try {
    const show = !req.session.vote;
    const data = await Quiz.find();

    let sum = 0;
    data.forEach(quiz => {
      sum += quiz.vote;
    })

    res.render('quiz', { title: 'Quiz', data, show, sum });
  } catch (err) {
    throw new Error(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const id = req.body.quiz;
    const quiz = await Quiz.findOne({ _id: id });
    quiz.vote++;
    await quiz.save();

    req.session.vote = 1;
    res.redirect('quiz');
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
