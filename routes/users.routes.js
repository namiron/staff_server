const express = require("express");
const router = express.Router();
const { login, register, current } = require("../controllers/users");
const auth = require("../middleware/auth.middleware");

// http://localhost:5000/api/user/login
router.post("/login", login);
// http://localhost:5000/api/user/register
router.post("/register", register);
// http://localhost:5000/api/user/current
router.get("/current", auth, current);

module.exports = router;
