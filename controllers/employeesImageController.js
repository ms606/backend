const e = require('express');
const employees = require('../db_apis/employeeImage.js');
 
async function get(req, res, next) {
  try {
    const context = {};

    console.log(req.params)
    
    context.id = parseInt(req.params.id, 10);
 
    const rows = await employees.find(context);
    
    console.log(req.params)

    res.status(200).json(rows);

    // if (req.params.id) {
    //   if (rows.length === 1) {


    //     console.log('status',rows)

    //     res.status(200).json(rows);

      


    //   } else {
    //     res.status(404).end();
    //   }
    // } else {
    //   res.status(200).json(rows);
    // }

  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;