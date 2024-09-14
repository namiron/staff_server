require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://staff-client-ruddy.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", require("./routes/users.routes"));
app.use("/api/employees", require("./routes/employees.routes"));

app.use("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
