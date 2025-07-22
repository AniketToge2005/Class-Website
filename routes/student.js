
var express = require("express");
var router = express.Router();
var check_login = require("./check_login");
var exe = require('./../connection');



router.get("/",check_login,function (req,res){
  res.render("student/home.ejs");

});

// router.get("/view_assignment", async (req, res) => {
//   if (!req.session.user?.std_id) {
//     return res.redirect("/login");
//   }

//   const sql = `
//     SELECT
//       a.assignments_id   AS assignment_id,
//       a.title,
//       a.subject,
//       a.date             AS due_date,
//       a.pdf              AS pdf_path
//     FROM students AS s
//     INNER JOIN assignments AS a
//       ON s.std_class_id = a.std_class_id
//     WHERE s.std_id = ?
//   `;

//   try {
//     const assignments = await exe(sql, [req.session.user.std_id]);
//     console.log("Assignments fetched:", assignments); // Debug output
//     res.render("student/view_assignment.ejs", { list: assignments });
//   } catch (err) {
//     console.error("DB error:", err);
//     res.render("student/view_assignment.ejs", { list: [] });
//   }
// });





router.get("/profile",function (req, res) {
  res.render("student/profile.ejs");

});

router.post("/update_profile",async function(req,res){
  var d = req.body;


if(req.files){
    var filename = new Date().getTime()+req.files.std_photo.name;
      req.files.std_photo.mv("public/uplaod/"+filename);
      var sql = `UPDATE students SET std_photo = '${filename}' WHERE std_id = '${d.std_id}'`;
      var data = await exe(sql)
       req.session.user.std_photo = filename;

   }


  var sql = `UPDATE students SET
              std_name = ?,
              std_phone = ?,
              std_email = ?
          WHERE std_id = ?   
  `
data = await exe(sql,[d.std_name,d.std_phone,d.std_email,d.std_id])
 req.session.user.std_name = d.std_name;
 req.session.user.std_phone = d.std_phone;
 req.session.user.std_email = d.std_email;
  res.redirect("/stu")
  // res.send(data)
})





 

module.exports = router;
