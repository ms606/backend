const database = require('../services/database.js');
const oracledb = require('oracledb');

const baseQuery = 
 `select ecode "Employee ID",
         ename "Name",
         fname "Father's Name",
         address "Address",
         to_char(apdat,'DD-Month-YYYY') "Appointed On",
         branch,
         dpnam, 
         dsnam,
         cellno
  from employee_details`;

  async function find(context) {
    var query = baseQuery;
    var binds = {};

   //console.log('context 22', context)
   if (context.id)  {
    binds.ecode = context.id;
    query += `\n where ecode = :ecode`;
  } 
   
   // console.log(query, binds)
   var result;
    result = await database.simpleExecute(query, binds);
  
    return result.rows;
  }
  
  module.exports.find = find;

// ------------------------------------------
  const createSql = 
    `insert into employee_master (
        ecode, 
        ename
      ) values (
        :ecode, 
        :ename
      ) `;

  async function create(emp) {

    // await database.makeQuery();
    // return null;

    const employee = Object.assign({}, emp);

    // console.log(emp);
     //console.log('message0.1',createSql);
     //console.log('message0',employee);

    const obj = {} ;

     obj.ecode  = {
       val: employee.ecode,
       dir: oracledb.BIND_INOUT,
     }

     obj.ename  = {
        val: employee.ename,
        dir: oracledb.BIND_INOUT,
     }

    //console.log('message1', obj);    

    const result = await database.simpleExecute(createSql, obj);
  
    //console.log("result",result);

    employee.ecode = result.outBinds.ecode[0];

    return employee;
  }

  module.exports.create = create;

  const updateSql = 
      `update employee_master 
       set    ename = :ename,
              fname = :fname
       where  ecode = :ecode`;
              //   fname = :fname, apdat = :apdat 


  async function update(emp) {
    const employee = Object.assign({}, emp);
    //console.log('putty', employee);
    
    const obj = {} ;

    obj.ecode  = {
        val: employee.ecode,
        dir: oracledb.BIND_INOUT
    }

    obj.ename = {
        val: employee.ename,
        dir: oracledb.BIND_INOUT
    }

    obj.fname = {
        val: employee.fname,
        dir: oracledb.BIND_INOUT
    }
    
    //console.log('message0',obj);   

    const result = await database.simpleExecute(updateSql, obj);

    if (result.rowsAffected && result.rowsAffected === 1) {
      return employee;
    } else {
      return null;
    }
  }

  module.exports.update = update;

  const deleteSql = 
    ` delete from employee_master where ecode = :ecode;
      :rowcount := sql%rowcount;
    `;

  async function del (id) {
    const binds = {
      ecode: id,
      rowcount: {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
      } 
    }

    const result = await database.simpleExecute(deleteSql, binds);

    return result.outBinds.rowcount === 1;
  }

module.exports.delete = del;


// -----------------------------------------------------
// Employee Timings for specific person

const employeeTimingQuery = 
 `select ecode, ename, fname, department, designation, edate, eday, time1, time2, tfrom, tto, status 
  from employee_timings_view
  `;

  async function getTiming(context) {
   // console.log("context",context)

    let timquery = employeeTimingQuery;
    let binds_time = {};
    //console.log("binds_time",binds_time)
    if (context.id) {
      binds_time.ecode = context.id;
      binds_time.edate  = context.date;
      timquery += `where to_char(to_date(edate,'dd-mm-rrrr'),'mm-rrrr') = to_char(to_date(to_date(:edate,'rrrr-mm-dd'),'dd-mm-rrrr'),'mm-rrrr') and ecode = :ecode`;
    } 
  //  console.log('rows',  timquery, binds_time)
    let result = await database.simpleExecute(timquery, binds_time);
     
    return result.rows;
  }
  
  module.exports.getTiming = getTiming;

// -----------------------------------------------------
// Employee Salary for specific person
  async function getSalary(context) {
    query = 
    `select ecode, to_char(edate) edate, ename, fname, dpnam, dsnam, netsalary, biocheck 
     from employee_salary`;
   
    binds = {};
    
    if (context.id) {
      binds.ecode = context.id;
        query += ` where ecode = :ecode order by to_date(edate, 'dd-month-rrrr') desc`;
    } 
   // console.log('rows', query, binds)
    result = await database.simpleExecute(query, binds);
   // console.log('result', result)

    return result.rows;
  }  
  module.exports.getSalary = getSalary;

// -----------------------------------------------------
// Employee Salary Detail for specific person
async function getSalaryEarning(context) {
  query = 
  ` select sm.ecode , to_char(sm.edate,'MON-YYYY') , st.tcode , st.lcode , amt , sl.LNAME
    from   employee_salary_mst sm , employee_salary_trn st , new_salary_link sl
    where  sm.srn = st.srn
    and    sm.xcode = st.xcode
    and    sm.ycode = st.ycode
    and    sl.lcode = st.lcode
    and    pside = 'E'
    and    amt > 0
    and    to_char(to_date(sm.edate,'dd-mm-rrrr'),'rrrr-mm') = to_char(to_date(:edate,'dd-mon-rr'),'rrrr-mm')`;

 // console.log('context',context)
 
  binds = {};
  
  if (context.id) {
    binds.ecode = context.id;
    binds.edate  = context.date;
      query += `\nand sm.ecode = :ecode`;
  } 
  //console.log('rows', query, binds)
  result = await database.simpleExecute(query, binds);
 // console.log('result', result)

  return result.rows;
}  
module.exports.getSalaryEarning = getSalaryEarning;

async function getSalaryDeduction(context) {
  query = 
  `select sm.ecode , to_char(sm.edate,'MON-YYYY') , st.tcode , st.lcode , amt , sl.LNAME
  from   employee_salary_mst sm , employee_salary_trn st , new_salary_link sl
  where  sm.srn = st.srn
  and    sm.xcode = st.xcode
  and    sm.ycode = st.ycode
  and    sl.lcode = st.lcode
  and    pside = 'D'
  and    to_char(to_date(sm.edate,'dd-mm-rrrr'),'rrrr-mm') = to_char(to_date(:edate,'dd-mon-rr'),'rrrr-mm')`;

  //console.log('context',context)
 
  binds = {};
  
  if (context.id) {
    binds.ecode = context.id;
    binds.edate  = context.date;
      query += `\nand sm.ecode = :ecode`;
  } 
  //console.log('rows', query, binds)
  result = await database.simpleExecute(query, binds);
 // console.log('result', result)

  return result.rows;
}  
module.exports.getSalaryDeduction = getSalaryDeduction;

async function getSalarySummary(context) {
  query = 
  `select ecode, srn, xcode, ycode, sum(earn) - sum(dedc) netSal
  from (
  select sm.ecode, sm.srn, st.xcode , st.ycode,  sum(amt) Earn , 0 dedc from employee_salary_mst sm , employee_salary_trn st
  where pside = 'E' and sm.srn = st.srn and sm.xcode = st.xcode and  sm.ycode = st.ycode and  sm.ecode = st.ecode
  and    to_char(to_date(edate,'dd-mm-rrrr'),'rrrr-mm') = to_char(to_date(:edate,'dd-mon-rr'),'rrrr-mm')
  group by sm.ecode , sm.srn , st.xcode , st.ycode
  union all
  select sm.ecode, sm.srn, st.xcode , st.ycode ,  0 earn , sum(amt) Dedc from employee_salary_mst sm , employee_salary_trn st
  where  pside = 'D' and sm.srn = st.srn and sm.xcode = st.xcode and  sm.ycode = st.ycode and  sm.ecode = st.ecode
  and    to_char  (to_date(edate,'dd-mm-rrrr'),'rrrr-mm') = to_char(to_date(:edate,'dd-mon-rr'),'rrrr-mm')
  group by sm.ecode , sm.srn , st.xcode , st.ycode
  ) `;

  //console.log('context',context)
 
  binds = {};
  
  if (context.id) {
    binds.ecode = context.id;
    binds.edate  = context.date;
      query += `\where ecode = :ecode group by ecode , srn , xcode , ycode`;
  } 
  //console.log('rows', query, binds)
  result = await database.simpleExecute(query, binds);
 // console.log('result', result)

  return result.rows;
}  
module.exports.getSalarySummary = getSalarySummary;


async function getEmployeeDetail(context){
 // console.log('context', context)
  binds = {};
  query = `select ecode, ename, to_char(sysdate,'Mon-yyyy') mont,
  sum( case when status = 'On Time' then 1 else 0 end)  onTime,
  sum( case when status = 'Late' then 1 else 0 end) Late
  from   employee_timings_view
  where  to_char(edate,'mon-yyyy') = to_char(sysdate,'mon-yyyy')`


if (context.id) {
  binds.ecode = context.id;
  query += `\n and ecode = :ecode group by ecode, ename, to_char(sysdate,'Mon-yyyy')`;
}

result = await database.simpleExecute(query, binds);
return result.rows;  
}
module.exports.getEmployeeDetail = getEmployeeDetail;


async function getAllEmployeeMaster(context){
  console.log('context', context)
  binds = {};
  query = `select XCODE  ,
  ECODE  ,  STAFF ,  ENAME  ,  APDAT ,  FNAME ,  MNAME ,  ADDR1 ,
  ADDR2 ,  ADDR3 ,  PCELL ,  OCELL ,  PHRES ,  DSCOD ,  DPCOD ,  IDCRD ,  IDEXP ,   LDATE  from employee_master`

  result = await database.simpleExecute(query, binds);
  console.log('result', result)

  return result.rows;
  
}
module.exports.getAllEmployeeMaster = getAllEmployeeMaster;

