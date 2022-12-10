const e = require('express');
const stationeryItems = require('../db_apis/stationeryItems.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.sname = req.params.sname;
    console.log(context)
    const rows = await stationeryItems.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;