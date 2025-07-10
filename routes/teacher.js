

var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function(req, res) {
  res.render("teacher/home.ejs");

});
router.get("/my_classes",function(req,res){
  res.render("teacher/my_classes.ejs")
})

router.get("/assignment",function(req,res){
  res.render("teacher/assignment.ejs")
})
module.exports = router;
