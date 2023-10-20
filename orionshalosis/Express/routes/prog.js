const express = require('express');
const router = express.Router();
const prog = require('../services/prog');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await prog.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;