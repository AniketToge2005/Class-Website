
var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function (req, res) {
  res.render("student/home.ejs");

});


router.get("/submission",function (req, res) {
  res.render("student/submission.ejs");

});

router.get("/profile",function (req, res) {
  res.render("student/profile.ejs");

});



 

module.exports = router;
