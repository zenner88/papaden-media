const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, link, description
    FROM youtube LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(youtube){
  const result = await db.query(
    `INSERT INTO youtube 
    (link) 
    VALUES 
    ("${youtube.link}")`
  );
  
  let message = 'Error in creating youtube';
  
  if (result.affectedRows) {
    message = 'youtube created successfully';
  }
  
  return {message};
}

async function update(id, youtube){
  const result = await db.query(
    `UPDATE youtube 
    SET link="${youtube.link}"
    WHERE id="${id}"` 
  );

  let message = 'Error in updating Banner';

  if (result.affectedRows) {
    message = 'Banner updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM banner WHERE id="${id}"`
  );

  let message = 'Error in deleting Banner';

  if (result.affectedRows) {
    message = 'Banner deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
