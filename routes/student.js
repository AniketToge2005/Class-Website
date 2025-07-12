
var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function (req, res) {
  res.render("student/home.ejs");

});


router.get("/submission",function (req, res) {
  res.render("student/submission.ejs");

});

module.exports = router;
