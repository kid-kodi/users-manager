var express = require("express");
var router = express.Router();

router.post("/register", (req, res) => {
  const { firstName, lastName, telephone, email, password } = req.body;
  res.send("Hello World Chicken!");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.send("Hello World Chicken!");
});

module.exports = router;
