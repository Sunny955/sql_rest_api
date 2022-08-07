const express = require("express");
require("dotenv").config();

// create express app
const app = express();

//use express json
app.use(express.json());

// import routes
const employees = require("./src/routes/employees");

// mount routes
app.use("/api/v1/employees", employees);

const PORT = process.env.PORT || 5000;

// listening to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
