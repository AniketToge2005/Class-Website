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
<<<<<<< HEAD
router.get("/profile",function (req, res) {
  res.render("user/profile.ejs");
=======
router.get("/admin",function (req, res) {
  res.render("user/admin.ejs");
>>>>>>> f648bcb7f2694dee9b49c94f9707522873f7e0a9

});


module.exports = router;
