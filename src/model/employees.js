const dbconn = require("../../config/db");

const Employee = function (employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.gender = employee.gender;
  this.hire_date = employee.hire_date;
  this.birth_date = employee.birth_date;
  this.emp_no = employee.emp_no;
};

Employee.getAllEmployees = (query, result) => {
  let limit = 10;
  let select = "*";
  if (query.limit) {
    limit = query.limit;
  }
  if (query.select) {
    select = query.select;
  }
  dbconn.query(`SELECT ${select} FROM employees LIMIT ${limit}`, (err, res) => {
    if (err) {
      console.log("Error while fetching employees", err);
      result(err);
    } else {
      console.log("Fetched employees data successfully!!");
      result(null, res);
    }
  });
};

Employee.getEmployee = (id, result) => {
  dbconn.query(`SELECT * FROM employees WHERE emp_no=?`, id, (err, res) => {
    if (err) {
      console.log("Error while fetching employees", err);
      result(null, err);
    } else {
      console.log("Fetched employees data successfully!!");
      result(null, res);
    }
  });
};

Employee.createEmployee = (input, result) => {
  dbconn.query(`INSERT INTO employees SET ?`, input, (err, res) => {
    if (err) {
      console.log("Error while entering employees data", err);
      result({ status: false, msg: "Error in creating new employee" });
    } else {
      console.log("Successfuly entered the data");
      result(null, {
        status: true,
        mssg: "Employee created successfully",
        insertId: res.emp_no,
      });
    }
  });
};

Employee.updateEmployee = (emp_no, input, result) => {
  dbconn.query(
    `UPDATE employees SET first_name=?,last_name=?,gender=?,hire_date=?,birth_date=? WHERE emp_no=?`,
    [
      input.first_name,
      input.last_name,
      input.gender,
      input.hire_date,
      input.birth_date,
      emp_no,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while entering employees data", err);
        result({ status: false, msg: "Error in updating employee" });
      } else {
        console.log("Successfuly updated the data");
        result(null, {
          status: true,
          msg: "Successfully updated the data",
          insertId: res.emp_no,
        });
      }
    }
  );
};

Employee.deleteEmployee = (id, result) => {
  dbconn.query(`DELETE FROM employees WHERE emp_no=?`, id, (err, res) => {
    if (err) {
      console.log("Error while deleting employee data", err);
      result(null, err);
    } else {
      console.log("Employee deleted successfully");
      result(null, {
        status: true,
        msg: "Employee data deleted successfully",
      });
    }
  });
};

module.exports = Employee;
