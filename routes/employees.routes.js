const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  all,
  add,
  remove,
  employee,
  edit,
} = require("../controllers/employees");

// http://localhost:5000/api/employees
router.get("/", auth, all);

// http://localhost:5000/api/employees/add
router.post("/add", auth, add);

// http://localhost:5000/api/employees/:id
router.get("/:id", auth, employee);

// http://localhost:5000/api/employees/remove/:id
router.post("/remove/:id", auth, remove);

// http://localhost:5000/api/employees/edit/:id
router.put("/edit/:id", auth, edit);

module.exports = router;
