const express = require('express');
const router = express.Router();
const loginCred = "admin";
const passwordCred = "admin123";

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', (req, res) => {
  const { login, pass } = req.body; 
  
  if(login === loginCred && pass === passwordCred) {
    req.session.admin = 1;

    res.redirect('/admin') 
  } else {
    res.redirect('/login')
  }
});

module.exports = router;
