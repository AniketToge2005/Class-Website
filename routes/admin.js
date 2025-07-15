
var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function (req, res) {
  res.render("admin/home.ejs");
});

router.get("/class5",function (req, res) {
  res.render("admin/class5.ejs");
});

//navbar_logo

router.get("/navbar_logo",function(req,res){
  res.render("admin/navbar_logo.ejs");
});

router.post("/navbar_logo",async function(req,res){

  var d = req.body;
  var sql = `INSERT INTO navbar_logo (filename, uploaded_at) VALUES ('${d.filename}','${d.uploaded_at}');`
  var data = await exe(sql);
  res.send(data);
  res.redirect("/navbar_logo");
});


// CREATE TABLE logos ( id INT AUTO_INCREMENT PRIMARY KEY, filename VARCHAR(255) , uploaded_at TIMESTAMP );


module.exports = router;
