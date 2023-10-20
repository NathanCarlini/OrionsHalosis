const express = require('express');
const router = express.Router();
const createAcc = require('../services/createAcc');

router.post('/', async function(req, res, next) {
    try {
      res.json(await createAcc.create(req.body));
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
      next(err);
    }
  });

module.exports = router;