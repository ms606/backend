const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = `select uname, ecode from employee_master`;

async function find(context) {
 let query = baseQuery;
 const binds = {};
 
    if (context) {
         query += `\n where uname = '${context.email}' and PASWD = '${context.password}'`;
    }
  
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}
  
  module.exports.find = find;