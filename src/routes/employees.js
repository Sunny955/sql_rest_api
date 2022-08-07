const express = require("express");
const router = express.Router();

const {
  getemployees,
  getemployee,
  createemployee,
  updateemployee,
  deleteemployee,
} = require("../controllers/employees");

// Get all empoyees
router.get("/", getemployees);

// Get single employee
router.get("/:id", getemployee);

// Create employee data
router.post("/", createemployee);

// Update employee data
router.put("/:id", updateemployee);

// Delete employee data
router.delete("/:id", deleteemployee);

module.exports = router;
