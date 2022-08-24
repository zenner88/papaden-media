const express = require('express');
const router = express.Router();
const banner_link = require('../services/banner_link');
var bodyParser = require('body-parser')
const app = express();

/* GET banner_link. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await banner_link.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting banner_link `, err.message);
    next(err);
  }
});

/* POST banner_link. */
router.post('/', async function(req, res, next) {
    try {
      res.json(await banner_link.create(req.body));
    } catch (err) {
      console.error(`Error while creating banner_link`, err.message);
      next(err);
    }
});

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// for parsing multipart/form-data
let multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id+'.png');
    console.log(req.params.id);
  }
});
var upload = multer({ storage: storage });
/* PUT banner_link */
router.put('/:id', upload.single('file'), async function(req, res, next) {
  // console.log(req);
    // const { filename: file } = req.file;
  try {
    res.json(await banner_link.update(req.params.id, req));
    } catch (err) {
      console.error(`Error while updating banner_link`, err.message);
      next(err);
    }
});

/* DELETE banner_link */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await banner_link.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting banner_link`, err.message);
      next(err);
    }
});

module.exports = router;