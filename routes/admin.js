
var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function (req, res) {
  res.render("admin/home.ejs");
});



module.exports = router;
