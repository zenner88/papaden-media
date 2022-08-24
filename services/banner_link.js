const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const router = require('../routes/banner_link');
const routers = express.Router();

// upload FILE
// parse application/json


async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT identifier, type, url, hyperlink
    FROM banner_link`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(banner_link){
  if (banner_link.type == "image"){
    var result = await db.query(
      `INSERT INTO banner_link 
      (identifier, type, hyperlink) 
      VALUES 
      ("${banner_link.identifier}", "${banner_link.type}", "${banner_link.hyperlink}")` 
    );
  }else if(banner_link.type == "video"){
    var result = await db.query(
      `INSERT INTO banner_link 
      (identifier, type, url) 
      VALUES 
      ("${banner_link.identifier}", "${banner_link.type}", "${banner_link.url}")` 
    );
  }
  let message = 'Error in creating banner_link';
  
  if (result.affectedRows) {
    message = 'banner_link created successfully';
  }
  
  return {message};
}

async function update(identifier, banner_link){
  if (banner_link.body.type == "image"){
    console.log(banner_link.body)
    var result = await db.query(
      `UPDATE banner_link 
      SET type="${banner_link.body.type}", hyperlink="${banner_link.body.hyperlink}", url=""
      WHERE identifier="${identifier}"` 
      );
    }else if(banner_link.body.type == "video"){
    console.log(banner_link.body)
    var result = await db.query(
      `UPDATE banner_link 
      SET type="${banner_link.body.type}", url="${banner_link.body.url}", hyperlink=""
      WHERE identifier="${identifier}"` 
    );
  }

  let message = 'Error in updating banner_link';

  if (result.affectedRows) {
    message = 'banner_link updated successfully';
  }
  // if (result.affectedRows && banner_link.body.type == "image") {
  //   console.log("upload in")
  //   // upload FILE 1
  //   // handle storage using multer
  //   var storage = multer.diskStorage({
  //     destination: function (req, file, cb) {
  //       cb(null, 'uploads');
  //     },
  //     filename: function (req, file, cb) {
  //       cb(null, `"${identifier}".png`);
  //     }
  //   });
  //   var upload = multer({ storage: storage });

  //   // handle single file upload
  //   app.post('/', upload.single('file'), (banner_link, res, next) => {
  //     const file = banner_link.file;
  //     if (!file) {
  //        return res.status(400).send({ message: 'Please upload a file.' });
  //     }
  //     return res.send({ message: 'File uploaded successfully.', file });
  //  });
  // }

  return {message};
}

async function remove(identifier){
  const result = await db.query(
    `DELETE FROM banner_link WHERE identifier="${identifier}"`
  );

  let message = 'Error in deleting banner_link';

  if (result.affectedRows) {
    message = 'banner_link deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
