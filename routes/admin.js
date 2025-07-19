
var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function(req, res) {
  res.render("admin/home.ejs")
});
//select contact info
router.get("/about_class",async function(req,res){
   var contact_info=await exe(`SELECT * FROM contact_info`)
   var obj={"contact_info":contact_info[0]}
  res.render("admin/about_class.ejs",obj)
})
// Update contact info
router.post("/about_class",async function(req,res){
  var d=req.body;

        if(req.files && req.files.logo_image){
        var logo_image=new Date().getTime()+".jpg";
        req.files.logo_image.mv("public/uplaod/"+logo_image);
        console.log(logo_image)
        var data1 = await exe(`UPDATE contact_info SET logo = '${logo_image}' WHERE id = 1`);

    }
  var sql=`UPDATE contact_info SET
    phone = ?,
    email = ?,
    whatsapp = ?,
    instagram = ?,
    twitter = ?,
    facebook = ?,
    linkedin = ?,
    work_time=?,
    address = ? WHERE id = 1`;

    var data = await exe(sql,[d.Phone,d.email,d.whatsapp,d.instagram,d.twitter,d.facebook,d.Linkedin,d.work_time,d.address])
  res.redirect("/admin/about_class")
})





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


 



// add student
router.get("/add_std",async function(req,res){
  res.render("admin/add_student.ejs")
})


router.post("/save_student",async function(req,res){

    var std_photo=new Date().getTime()+".jpg";
    req.files.std_photo.mv("public/uplaod/"+std_photo);


  var d=req.body;
  var sql="INSERT INTO students (std_name,std_phone,std_email,std_sc_name	,std_photo,std_dob,std_class,std_address) VALUES (?,?,?,?,?,?,?,?)";
  var data=await exe(sql,[d.std_name,d.std_phone,d.std_email,d.std_sc,std_photo,d.std_dob,d.std_class,d.std_address]);
  res.redirect("/admin/add_std")
  // res.send(data);
})

router.get("/view_students",async function(req,res){
  var search = req.query.search || '';
  var sql;
  var params = [];
  
  if (search) {
    sql = `SELECT * FROM students WHERE 
           std_name LIKE ? OR 
           std_phone LIKE ? OR 
           std_email LIKE ? OR 
           std_sc_name LIKE ? OR 
           std_class LIKE ? OR 
           std_address LIKE ?`;
    var searchPattern = `%${search}%`;
    params = [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern];
  } else {
    sql = `SELECT * FROM students`;
  }
  
  var data = await exe(sql, params);
  var obj = {"students": data, "search": search}
  res.render("admin/view_students.ejs",obj)
})
router.get("/delete_std/:id",async function(req,res){
  var id=req.params.id;
  var sql = `DELETE FROM students WHERE std_id = ${id}`;
  var data = await exe(sql);
  res.redirect("/admin/view_students")
})

module.exports = router;
