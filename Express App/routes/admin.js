const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('login');

    return;
  }

  next();
})

router.get('/', (req, res) => {
  News.find()
    .then((data) => res.render('admin/index', { title: 'Admin', data }));
});

router.get('/news/add', (req, res) => {
  res.render('admin/newsForm', { title: 'Add news', errors: {}, body: {} });
})

router.post('/news/add', (req, res) => {
  const body = req.body;

  const newsData = new News(body)
  const errors = newsData.validateSync();

  newsData.save()
    .then(
      () => { res.redirect('/admin') },
      () => res.render('admin/newsForm', { title: 'Add news', errors: errors || {}, body })
    );
})

router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/admin'))
})

module.exports = router;
