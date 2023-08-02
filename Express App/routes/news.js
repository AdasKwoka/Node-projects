const express = require('express');
const router = express.Router();
const News = require('../models/news')

router.get('/', async (req, res) => {
  const search = req.query.search || '';

  try {
    const foundNews = News
    .find({ title: new RegExp(search.trim(), 'i') })
    .sort({ created: -1 });

    const data = await foundNews.exec();

    res.render('news', { title: 'News', data, search });
  } catch (err) {
    throw new Error(err);
  }
  
});

module.exports = router;
