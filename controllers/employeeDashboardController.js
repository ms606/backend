const e = require('express');
const employeeDashboard = require('../db_apis/employeeDashboard.js');
 
async function get(req, res, next) {
  try {
    const context = {};
    
    context.keyword = req.params.keyword;
    
    const rows = await employeeDashboard.find(context);
 
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