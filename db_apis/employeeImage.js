const database = require('../services/database.js');
const oracledb = require('oracledb');

oracledb.fetchAsBuffer = [ oracledb.BLOB ];

const baseQuery = 
 `select image from emp_images`;

  async function find(context) {
    let query = baseQuery;
    const binds = {};
       console.log(context, 'emp image')
    if (context.id) {
      binds.ecode = context.id;
      query += `\n where ecode = :ecode`;
    }
  
    const result = await database.simpleExecute(query, binds,
      { fetchInfo: {"image": {type: oracledb.BUFFER}}}
      );


    // var reader = new FileReader();
    // reader.readAsDataURL(blob.rows[0]); 
    // reader.onloadend = function() {
    //   var base64data = reader.result;                
    //   console.log(base64data);
    //}


    //console.log(result)
    const blob = result.rows[0]

  //  console.log(blob)
    
  
    return blob;
  }
  
  module.exports.find = find;

