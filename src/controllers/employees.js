const Employee = require("../model/employees");

//@desc          Get all employees
//@route        /api/v1/employees

exports.getemployees = (req, res, next) => {
  let query;
  if (req.query) {
    query = req.query;
  }
  Employee.getAllEmployees(query, (err, employees) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      success: true,
      count: employees.length,
      pagination: employees.results.pagination,
      data: employees,
    });
  });
};

//@desc          Get single employee
//@route        /api/v1/employees/:id

exports.getemployee = (req, res, next) => {
  if (req.params.id.length < 5 || req.params.id.length > 11) {
    return res.status(402).json({
      success: false,
      error: "The employee id is invalid",
    });
  }
  Employee.getEmployee(req.params.id, (err, employee) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      success: true,
      data: employee,
    });
  });
};

//@desc          Create employee data
//@route        /api/v1/employees

exports.createemployee = (req, res, next) => {
  //Check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      mssg: "Please fill all fields",
    });
  }

  const Employeedata = new Employee(req.body);

  Employee.createEmployee(Employeedata, (err, employee) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.status(200).json({
      success: true,
      data: employee,
    });
  });
};

//@desc          Update employee data
//@route        /api/v1/employees/:id

exports.updateemployee = (req, res, next) => {
  const Employeedata = new Employee(req.body);

  Employee.updateEmployee(req.params.id, Employeedata, (err, employee) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.status(200).json({
      success: true,
      data: employee,
    });
  });
};

//@desc          Delete employee data
//@route        /api/v1/employees/:id

exports.deleteemployee = (req, res, next) => {
  if (req.params.id.length < 5 || req.params.id.length > 11) {
    return res.status(402).json({
      success: false,
      error: "The employee id is invalid",
    });
  }

  Employee.deleteEmployee(req.params.id, (err, employee) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.status(200).json({
      data: employee,
    });
  });
};
