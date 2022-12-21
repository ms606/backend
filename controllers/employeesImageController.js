const e = require('express');
const employees = require('../db_apis/employeeImage.js');
 
async function get(req, res, next) {
  try {
    const context = {};

    //console.log(req.params, 'emp img req.params')
    
    context.id = parseInt(req.params.id, 10);
 
    const rows = await employees.find(context);
    
    //console.log('rows from image controller', rows)

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;