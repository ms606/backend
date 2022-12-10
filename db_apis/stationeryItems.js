const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select scode, sname, blqty from stationary_codes where blqty > 0`;

  async function find(context) {
    let query = baseQuery;
    const binds = {}
    if (context) {
        query += `\nand sname like '%${context.sname}%'  order by scode`;
    }
  
    const result = await database.simpleExecute(query, binds);
  
    return result.rows;
  }
  
  module.exports.find = find;