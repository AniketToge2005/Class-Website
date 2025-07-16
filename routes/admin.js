

var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function(req, res) {
  res.render("admin/home.ejs")
});

router.get("/my_classes",function(req,res){
  res.render("admin/my_classes.ejs")
})

router.get("/assignment",async function(req,res){
  var sql = `SELECT * FROM assignment`
  var data = await exe(sql);
  var obj = {"alist":data}
  res.render("admin/assignment.ejs",obj)
})
router.post("/save_assignment",async function(req, res) {
  // console.log("Received assignment data:", req.body);
  var d = req.body;
  var sql = "INSERT INTO assignment (batch_name,title,subject,due_date,description) VALUES (?,?,?,?,?)";
  var data = await exe(sql,[d.batch_name,d.title,d.subject,d.due_date,d.description]);
  // res.send(data);
  res.redirect("/teach/assignment")
  // res.send(req.body);
});

router.get("/study_material",function(req,res){
  res.render("admin/study_material.ejs")
})

router.get("/attendance",function(req,res){
  res.render("admin/attendance.ejs")
})
router.get("/announcement",function(req,res){
  res.render("admin/announcement.ejs")
})


 

module.exports = router;
