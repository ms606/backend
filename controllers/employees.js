const { response } = require('express');
const e = require('express');
const employees = require('../db_apis/employees.js');
 
const { authJwt } = require("../middleware"); 

async function get(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);
    // console.log(context, req.params.id,'resposeeeeeeeeeeeeeeee 111111');
    
    authJwt.verifyToken(req, res, next);

    // console.log(context, req.params, req.id,'resposeeeeeeeeeeeeeeee 222222');
    console.log(res.statusCode,'response from auth');
    if (res.statusCode == 304){
       res.status(500).send('Cant Authorise!')
    }
      else 
      {
        var rows;

        if(req.id){
           rows = await employees.find(context); 
        }
       
        // console.log('result',rows)
        // console.log('req',req.id)
        
        if (req.id) {
           if (rows.length === 1) {
            res.status(200).json(rows[0]);
           } else {
             res.status(404).end();
           }
         } else {
           res.status(200).json(rows);
         }
      } 
      }
    
    catch (err) {
     next(err);
  }
}

module.exports.get = get;

function getEmployeeFromRec(req){
  const employee = {
    ecode: req.body.ecode,
    ename: req.body.ename,
    fname: req.body.fname
  };
    
  return employee;
}

async function post(req, res, next){
  try {
    let employee = getEmployeeFromRec(req);
    
    //console.log('post',employee);
    
    employee = await employees.create(employee);

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
} 
module.exports.post = post;



async function put(req, res, next){
  try {
    let employee = getEmployeeFromRec(req);

    //console.log('put',employee);

    //employee.ecode = parseInt(req.params.id, 10);

    employee = await employees.update(employee);

    if ( employee !== null ){
      res.status(200).json(employee);
    } else {
      res.status(404).end();
    } 
  } catch (err) {
      next(err);
  }
}

 module.exports.put = put;

 async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    const success = await employees.delete(id);

        if (success) {
          res.status(204).end();
        } else {
          res.status(404).end();
        }
      } catch (err) {
      next(err);
    }
 }

 module.exports.delete = del;

// -------------------------------------------------- 
//  timings 
 async function getTiming(req, res, next) {
  try {
    const context = {};
    
    context.id = parseInt(req.params.id, 10);
    context.date = req.params.date;
    console.log('req.params',req.params)
    
    const rows = await employees.getTiming(context);
    
    if (req.params.id) {
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.getTiming = getTiming;


// -------------------------------------------------- 
//  salary
async function getSalary(req, res, next) {
  try {
    const context = {};
    //console.log(req.params)
    context.id = parseInt(req.params.id, 10);
 
    const rows = await employees.getSalary(context);
    //console.log(rows)
    
    if (req.params.id) {
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.getSalary = getSalary;

// -------------------------------------------------- 
//  salary earning
async function getSalaryEarning(req, res, next) {
  try {
    const context = {};
    //console.log(req.params)
    context.id = parseInt(req.params.id, 10);
    context.date = req.params.date;

    const rows = await employees.getSalaryEarning(context);
    //console.log(rows)
    
    if (req.params.id) {
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.getSalaryEarning = getSalaryEarning;

//  salary deduction
async function getSalaryDeduction(req, res, next) {
  try {
    const context = {};
    //console.log(req.params)
    context.id = parseInt(req.params.id, 10);
    context.date = req.params.date;

    const rows = await employees.getSalaryDeduction(context);
    console.log(rows)
    
    if (req.params.id) {
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.getSalaryDeduction = getSalaryDeduction;

//  salary summary
async function getSalarySummary(req, res, next) {
  try {
    const context = {};
    //console.log(req.params)
    context.id = parseInt(req.params.id, 10);
    context.date = req.params.date;

    const rows = await employees.getSalarySummary(context);
    //console.log(rows)
    
    if (req.params.id) {
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.getSalarySummary = getSalarySummary;


//  employee summary
async function getEmployeeDetail(req, res, next) {
  try {
    const context = {};
    //console.log(req.params)
    context.id = parseInt(req.params.id, 10);
    

    const rows = await employees.getEmployeeDetail(context);
    console.log(rows)
    
    if (req.params.id) {
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.getEmployeeDetail = getEmployeeDetail;


//  employee master all
async function getAllEmployeeMaster(req, res, next) {
  try {
    const context = {};
   
    const rows = await employees.getAllEmployeeMaster();
    console.log(rows)
    
    if (req.params.id) {
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.getAllEmployeeMaster = getAllEmployeeMaster;
