const express = require('express');
const router = express.Router();
const News = require('../models/news')

router.get('/', async (req, res) => {
  const search = req.query.search || '';
  let sort = req.query.sort || -1;

  if (sort !== 1 || sort !== -1) {
    sort = -1;
  }

  try {
    const foundNews = News
    .find({ title: new RegExp(search.trim(), 'i') })
    .sort({ created: sort })
    .select('_id title description');

    const data = await foundNews.exec();

    res.json(data);
  } catch (err) {
    throw new Error(err);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const foundNews = News
      .findById(id)
      .select('_id title description');

    const data = await foundNews.exec();

    res.json(data);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
