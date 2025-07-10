
var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function (req, res) {
  res.render("student/home.ejs");

});

module.exports = router;
