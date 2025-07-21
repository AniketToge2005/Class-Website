
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


//add students

router.get("/add_std",async function(req,res){
  res.render("admin/add_student.ejs")
})


router.post('/save_student', async function (req, res) {
  const d = req.body;
  if(req.files && req.files.std_photo){
    var std_photo=new Date().getTime()+'.png';
    req.files.std_photo.mv("public/uplaod/"+std_photo);
    console.log(std_photo)
  }
  var sql=`INSERT INTO students (status, std_name,std_phone,std_email,std_sc_name, std_dob, std_class_id, std_address,std_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
  var data = await exe(sql,[d.status,d.std_name,d.std_phone,d.std_email,d.std_sc,d.std_dob,d.std_class,d.std_address,std_photo])
  res.redirect("/admin/add_std")
})


// std list 

router.get("/view_students",async function(req,res){
  var data = await exe(`SELECT * FROM students WHERE status='active'`);
  var obj={"students":data}
  res.render("admin/view_students.ejs",obj)
})

// delete student 

router.get("/delete_student/:id",async function(req,res){
  var data = await exe(`UPDATE students SET status='deleted' WHERE std_id = '${req.params.id}'`)
  res.redirect("/admin/view_students")
})

//   add   assignments

router.get("/add_assignments",async function(req,res){
  res.render("admin/Add_assignments.ejs")
})

router.post("/save_assignments",async function(req,res){
  var d=req.body;

  if(req.files && req.files.pdf){
    var pdf=new Date().getTime()+".pdf";
    req.files.pdf.mv("public/uplaod/"+pdf);
  }

var  sql = `INSERT INTO assignments(std_class_id, title, date, subject,pdf,status) VALUES (?, ?, ?, ?, ?,?)`;
var  data = await exe(sql,[d.class,d.title,d.date,d.subject,pdf,d.status]);
  res.redirect("/admin/add_assignments")
})

//   add list assignments

router.get("/all_assignments",async function(req,res){
  var data = await exe(`SELECT * FROM assignments WHERE status='active'`);
  var obj={"assignments":data}
  res.render("admin/All_assignments.ejs",obj)
})

router.get("/delete_assignments/:id",async function(req,res){
  var data = await exe(`UPDATE  assignments  SET  status='deleted' WHERE assignments_id='${req.params.id}'`)
  res.redirect("/admin/all_assignments")
})


// add study  material

router.get("/study_material",function(req,res){
  res.render("admin/study_material.ejs")
})






// CREATE TABLE about (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     title VARCHAR(255),                     
//     subtitle VARCHAR(255),                 
//     description TEXT,                     
//     image VARCHAR(255),               
   
//    );



//about 

// about page ver form ghenyasathi


router.get("/about", async function(req,res){

  var data = await exe('SELECT* FROM about');
  var obj = {"about":data};

  res.render("admin/about.ejs",obj);
});



// about edit page
router.get("/edit_about/:id", async function(req, res) {
  var id = req.params.id;
  
  if (id === 'new') {
    // For new entry, create empty object
    var obj = {
      "about": {
        id: 'new',
        title: '',
        subtitle: '',
        description: '',
        image: null
      }
    };
    res.render("admin/edit_about.ejs", obj);
  } else {
    // For existing entry, fetch from database
    var sql = "SELECT * FROM about WHERE id = ?";
    var data = await exe(sql, [id]);
    var obj = {"about":data[0]};
    res.render("admin/edit_about.ejs", obj);
  }
});

router.post("/save_about",async function(req,res){
  var d = req.body;
  
  if(req.files && req.files.image){
    var image = new Date().getTime()+req.files.image.name;
    req.files.image.mv("public/uplaod/"+image);

    var sql =`INSERT INTO about (title,subtitle, description, image ) VALUES ('${d.title}','${d.subtitle}','${d.description}','${image}');`
    var data = await exe(sql);
  } else {
    var sql =`INSERT INTO about (title,subtitle, description, image ) VALUES ('${d.title}','${d.subtitle}','${d.description}',NULL);`
    var data = await exe(sql);
  }
  
  res.redirect("/admin/about")
});



// Update about entry
router.post("/update_about/:id", async function(req, res) {
  var id = req.params.id;
  var d = req.body;
  
  if (id === 'new') {
    // Handle new entry
    if(req.files && req.files.image){
      var image = new Date().getTime()+req.files.image.name;
      req.files.image.mv("public/uplaod/"+image);

      var sql = `INSERT INTO about (title, subtitle, description, image) VALUES (?, ?, ?, ?)`;
      var data = await exe(sql, [d.title, d.subtitle, d.description, image]);
    } else {
      var sql = `INSERT INTO about (title, subtitle, description) VALUES (?, ?, ?)`;
      var data = await exe(sql, [d.title, d.subtitle, d.description]);
    }
  } else {
    // Handle update
    if(req.files && req.files.image){
      var image = new Date().getTime()+req.files.image.name;
      req.files.image.mv("public/uplaod/"+image);

      var sql = `UPDATE about SET title = ?, subtitle = ?, description = ?, image = ? WHERE id = ?`;
      var data = await exe(sql, [d.title, d.subtitle, d.description, image, id]);
    } else {
      var sql = `UPDATE about SET title = ?, subtitle = ?, description = ? WHERE id = ?`;
      var data = await exe(sql, [d.title, d.subtitle, d.description, id]);
    }
  }
  
  res.redirect("/admin/about");
});

// Delete assignment

// Delete about entry
router.get("/delete_about/:id", async function(req, res) {
  var id = req.params.id;
  
  // First get the image filename to delete the file
  var getImageSql = "SELECT image FROM about WHERE id = ?";
  var imageData = await exe(getImageSql, [id]);
  
  if (imageData.length > 0 && imageData[0].image) {
    // Delete the image file from uploads folder
    const fs = require('fs');
    const imagePath = `public/uplaod/${imageData[0].image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  
  // Delete from database
  var sql = "DELETE FROM about WHERE id = ?";
  var data = await exe(sql, [id]);
  res.redirect("/admin/about");
});



// add student
router.get("/add_std",async function(req,res){
  res.render("admin/add_student.ejs")
})


// router.post("/save_student",async function(req,res){

//     var std_photo=new Date().getTime()+".jpg";
//     req.files.std_photo.mv("public/uplaod/"+std_photo);


//   var d=req.body;
//   var sql="INSERT INTO students (std_name,std_phone,std_email,std_sc_name	,std_photo,std_dob,std_class,std_address) VALUES (?,?,?,?,?,?,?,?)";
//   var data=await exe(sql,[d.std_name,d.std_phone,d.std_email,d.std_sc,std_photo,d.std_dob,d.std_class,d.std_address]);
//   res.redirect("/admin/add_std")
//   // res.send(data);
// })

// router.get("/view_students",async function(req,res){
//   var search = req.query.search || '';
//   var sql;
//   var params = [];
  
//   if (search) {
//     sql = `SELECT * FROM students WHERE 
//            std_name LIKE ? OR 
//            std_phone LIKE ? OR 
//            std_email LIKE ? OR 
//            std_sc_name LIKE ? OR 
//            std_class LIKE ? OR 
//            std_address LIKE ?`;
//     var searchPattern = `%${search}%`;
//     params = [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern];
//   } else {
//     sql = `SELECT * FROM students`;
//   }
  
//   var data = await exe(sql, params);
//   var obj = {"students": data, "search": search}
//   res.render("admin/view_students.ejs",obj)
// })
router.get("/delete_std/:id",async function(req,res){
  var id=req.params.id;
  var sql = `DELETE FROM students WHERE std_id = ${id}`;
  var data = await exe(sql);
  res.redirect("/admin/view_students")
})

//   book_library

router.get('/book_library', async function(req, res) {
  res.render('admin/book_library.ejs');
});




// new offer page

router.get("/offer",function(req,res){
  res.render("admin/offer.ejs")
})

module.exports = router;
