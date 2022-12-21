const e = require('express');
const userLogin = require('../db_apis/userLoginApi.js');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

 
async function post(req, res, next) {
  try {
    const context = {};
 
    context.email = req.body.email;
    context.password = req.body.password.toString();
   
    const rows = await userLogin.find(context);
    
    var token = jwt.sign({ id: rows[0].ECODE }, 'muffin', {
      expiresIn: 86400 // 24 hours
    });
    
    rows[0].token = token
    
    if (rows.length > 0) res.status(200).json(rows);

    if (rows.length === 0 ) {res.status(401);  throw new Error('Invalid email or password')};

  } catch (err) {
    next(err);
  }
}
module.exports.post = post;