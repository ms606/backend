const e = require('express');
const attendance = require('../db_apis/attendanceSave.js');
//console.log('attendancecontroller')
function getAttendanceFromRec(req){
  //  console.log('This is the request',req.params)

    const attendance = {
      ecode: req.params.id,
      img64: req.body.img64//,
      // img: req.body.img
    };
        
   // console.log('This is the attendance obj',attendance)
    return attendance;
}

async function post(req, res, next){
    try {
       // console.log('req', req);

      let attendanceDetail = getAttendanceFromRec(req);      
      //console.log('post', attendanceDetail);
      
      attendanceDetail = await attendance.create(attendanceDetail);
  
      res.status(201).json(attendance);
    } catch (err) {
      next(err);
    }
} 

module.exports.post = post;