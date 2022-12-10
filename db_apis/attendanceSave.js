const database = require('../services/database.js');
const oracledb = require('oracledb');
const fs = require('fs');


// const d = new Date()
var today = new Date();
var time = new Date().toLocaleTimeString();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var d = dd + '-' + monthNames[today.getMonth()] + '-' + yyyy;

const createSql = `insert into employee_timinigs_web (xcode, ycode, ecode, edate, tim, img64 )
                   values (1, 1, :ecode, '${d}', '${time}', :img64 )`

  async function create(app) {
    // await database.makeQuery();
    // return null;

    const attendance = Object.assign({}, app);

    //console.log('app',app);
    //console.log('message0.1',createSql);
    //console.log('message0',employee);

    let obj = {} ;
    let base64Image = attendance.img64.split(';base64,').pop();

     var buf = Buffer.from(base64Image, 'base64');
     
    // console.log(buf,'buf')

     obj.img64 = {
       val: buf, //fs.createWriteStream('attendanceImg64.jpg').write(buf),
       dir: oracledb.BIND_INOUT,
       type: oracledb.BUFFER
     }

     obj.ecode = {
        val: attendance.ecode,
        dir: oracledb.BIND_INOUT,
     }

   //console.log('message1', obj, createSql);    

    const result = await database.simpleExecute(createSql, obj);
    
    //console.log("result",result);

    //employee.ecode = result.outBinds.ecode[0];

    return result;
  }

  module.exports.create = create;