const express = require('express');
const router = new express.Router();

const employees = require('../controllers/employees.js')
const employeeImage = require('../controllers/employeesImageController.js')
const stationaryItems = require('../controllers/stationeryItems.js')
const companyprofile = require('../controllers/companyprofile.js')
const userLogin = require('../controllers/userLoginController.js')
const employeeDashboard = require('../controllers/employeeDashboardController.js')
const employeeApplication = require('../controllers/employeeApplicationController.js');
const { getEmployeeDetail } = require('../db_apis/employees.js');
const attendance = require('../controllers/attendanceController.js');

router.route('/employees/:id?')
    .get(employees.get)
    .post(employees.post)
    .put(employees.put)
    .delete(employees.delete)

router.route('/employeeMaster').get(employees.getAllEmployeeMaster)    

router.route('/employeeTiming/:id/:date?')
    .get(employees.getTiming)  

router.route('/employeeSalary/:id?')    
    .get(employees.getSalary)

router.route('/employeeSalaryEarning/:id/:date?')
    .get(employees.getSalaryEarning)

router.route('/employeeSalaryDeduction/:id/:date?')
    .get(employees.getSalaryDeduction)

    router.route('/employeeSalarySummary/:id/:date?')    
    .get(employees.getSalarySummary)

router.route('/employeeImage/:id?')
    .get(employeeImage.get)

router.route('/employeeDashboard/:keyword?')
    .get(employeeDashboard.get)

router.route('/stationaryItems/:sname?')
    .get(stationaryItems.get)

router.route('/companyprofile')
    .get(companyprofile.get)

router.route('/users/login')
    .post(userLogin.post)    

router.route('/employeeApplication/')
    .post(employeeApplication.post)

router.route('/employeeDetail/:id').get(employees.getEmployeeDetail)

router.route('/attendance/:id').post(attendance.post)


module.exports = router;