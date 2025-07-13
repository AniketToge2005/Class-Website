
var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function (req, res) {
  res.render("admin/home.ejs");
});

router.get("/class5",function (req, res) {
  res.render("admin/class5.ejs");
});



module.exports = router;
