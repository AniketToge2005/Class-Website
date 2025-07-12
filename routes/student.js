
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



router.get("/profile",function(req,res){
  res.render("stu/profile.ejs");
});


router.post("/profile",async function(req,res){

  var d = req.body;
  var sql = ``
  var data = await exe(sql);
  res.send(data);
});


module.exports = router;
