const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select ecode, ename, fname, department, designation, edate, eday, time1, time2, tfrom, tto, status from employee_timings_view where edate = trunc(sysdate)`;

  async function find(context) {
    let query = baseQuery;
    const binds = {};
    console.log(context.keyword)
    
    if (context.keyword){
        //binds.name = context.keyword;
  
         query += `\nand ename like '%${context.keyword}%' order by ename`;
        
    }
    console.log(query)
    const result = await database.simpleExecute(query, binds);
  
    return result.rows;
  }
  
  module.exports.find = find;