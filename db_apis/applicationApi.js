const database = require('../services/database.js');
const oracledb = require('oracledb');

// const d = new Date()
var today = new Date();
var time = today.toLocaleTimeString();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var d = dd + '-' + monthNames[today.getMonth()] + '-' + yyyy;

const createSql = `insert into Employee_Application_Request (xcode, ycode, yrno, endate, etime, ecode, subject, detail, fdate, tdate, JPGI )
    
    values (1, 1, 'A', '${d}' , '${time}' , 1,  :subject, :detail, :from_date, :to_date, :upload_file ) `

  async function create(app) {

    // await database.makeQuery();
    // return null;

    const application = Object.assign({}, app);

    console.log(app);
    //console.log('message0.1',createSql);
    //console.log('message0',employee);

    let obj = {} ;
 /*
    obj.typer = {
        val: application.typer,
        dir: oracledb.BIND_INOUT,
      }
*/
      obj.from_date = {
        val: application.from_date,
        dir: oracledb.BIND_INOUT,
      }
     
      obj.to_date = {
        val: application.to_date,
        dir: oracledb.BIND_INOUT,
      }

     obj.subject = {
       val: application.subject,
       dir: oracledb.BIND_INOUT,
     }

     obj.detail = {
        val: application.detail,
        dir: oracledb.BIND_INOUT,
     }

     obj.upload_file = {
        val: application.upload_file,
        dir: oracledb.BIND_INOUT,
     }

    console.log('message1', obj, createSql);    

    const result = await database.simpleExecute(createSql, obj);
    
    //console.log("result",result);

    //employee.ecode = result.outBinds.ecode[0];

    return application;
  }

  module.exports.create = create;