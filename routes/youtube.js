const express = require('express');
const router = express.Router();
const youtube = require('../services/youtube');
var bodyParser = require('body-parser')

/* GET Youtube. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await youtube.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting youtube `, err.message);
    next(err);
  }
});

/* POST Youtube. */
router.post('/', async function(req, res, next) {
    try {
      res.json(await youtube.create(req.body));
    } catch (err) {
      console.error(`Error while creating youtube`, err.message);
      next(err);
    }
});

/* PUT youtube */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await youtube.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating youtube`, err.message);
      next(err);
    }
});

/* DELETE youtube */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await youtube.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting youtube`, err.message);
      next(err);
    }
});

module.exports = router;