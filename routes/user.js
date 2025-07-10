var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function (req, res) {
  res.render("user/home.ejs");

});
router.get("/services",function (req, res) {
  res.render("user/services.ejs");

});
router.get("/contact",function (req, res) {
  res.render("user/contact.ejs");

});
router.get("/about",function (req, res) {
  res.render("user/about.ejs");

});
router.get("/teacher",function (req, res) {
  res.render("user/teacher.ejs");

});
router.get("/student",function (req, res) {
  res.render("user/student.ejs");

});

router.get("/profile",function (req, res) {
  res.render("user/profile.ejs");
})




module.exports = router;
