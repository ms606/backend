const e = require('express');
const application = require('../db_apis/applicationApi.js');
 

function reformatDate(dateStr)
    {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ];

    var dArr = dateStr.split("-");  // ex input "2010-01-18"
    var mon = Number(dArr[1]-1)
    return dArr[2]+ "-" + monthNames[mon]  + "-" +dArr[0]; //ex out: "18/01/10"
    } 

function getApplicationFromRec(req){
    console.log('This is the request',req)

    const application = {
      subject: req.body.subject,
      detail:  req.body.detail,
      typer:   '' ,
      from_date: req.body.from_date,
      to_date: req.body.to_date,
      upload_file: req.body.upload_file
    };
    
    //console.log('object of application 1',application)  
    const new_from_date = reformatDate( application.from_date); 
    application.from_date = new_from_date;

    const new_to_date = reformatDate(application.to_date); 
    application.to_date = new_to_date;
    //console.log('object of application 2',application)  
    
    return application;
}

async function post(req, res, next){
    try {
      let applicationDetail = getApplicationFromRec(req);
      
      console.log('post',applicationDetail);
      
      applicationDetail = await application.create(applicationDetail);
  
      res.status(201).json(application);
    } catch (err) {
      next(err);
    }
} 

module.exports.post = post;