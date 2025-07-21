
var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",function(req, res) {
  res.render("admin/home.ejs")
});

//1.slider
router.get("/slider",async function(req,res){
  var data = await exe(`SELECT * FROM slider`);
  var obj = {"slist":data}
  res.render("admin/slider.ejs",obj)

})
//2. slider post
router.post("/save_slider",async function(req,res){
  var photo = new Date().getTime()+req.files.photo.name;
  req.files.photo.mv("public/uplaod/"+photo);

  var d = req.body;
  var sql = `INSERT INTO slider(title,subtitle,photo) VALUES (?,?,?)`
  var data = await exe(sql,[d.title,d.subtitle,photo])
  res.redirect("/admin/slider")
})

router.get("/edit_slider/:id",async function(req,res){
  var id = req.params.id;
  var data = await exe(`SELECT * FROM slider WHERE id = '${id}'`);
  var obj = {"sdet":data}
  res.render("admin/edit_slider.ejs",obj)
})

router.post("/update_slider",async function(req,res){
  var d = req.body;
   if(req.files){
    var filename = new Date().getTime()+req.files.photo.name;
      req.files.photo.mv("public/uplaod/"+filename);
      var sql = `UPDATE slider SET photo = '${filename}' WHERE id = '${d.id}'`;
      var data = await exe(sql)
   }
   var sql = `UPDATE slider SET
                title = ?,
                subtitle = ?
              WHERE id = ?  
   `
   var data = await exe(sql,[d.title,d.subtitle,d.id])
  res.redirect("/admin/slider")
})

// slider delete
router.get("/delete_slider/:id",async function(req,res){
  var id = req.params.id;
  var data = await exe(`DELETE FROM slider WHERE id = '${id}'`);
  res.redirect("/admin/slider")
})

// 2.specification png title subtitle
router.get("/specification",async function(req,res){
  var data = await exe(`SELECT * FROM specification`);
  var obj = {"slist":data};
  res.render("admin/specification.ejs",obj)
})

router.post("/save_specification",async function(req,res){
  var filename = new Date().getTime()+req.files.photo.name;
  req.files.photo.mv("public/uplaod/"+filename)

  var d = req.body
  var sql = `INSERT INTO specification(title,subtitle,photo) VALUES (?,?,?)`
  var data = await exe(sql,[d.title,d.subtitle,filename])
  res.redirect("/admin/specification")
})

// edit specification
router.get("/edit_speci/:id",async function(req,res){
  var id = req.params.id;
  var sql = `SELECT * FROM specification WHERE id = '${id}'`;
  var data = await exe(sql)
  var obj = {"sdet":data}
  res.render("admin/edit_specification.ejs",obj);
})

router.post("/update_specification",async function(req,res){
  var d = req.body;
   if(req.files)
    {
      var filename = new Date().getTime()+req.files.photo.name;
      req.files.photo.mv("public/uplaod/"+filename);
      var sql = `UPDATE specification SET  photo = '${filename}'  WHERE id = '${d.id}'`
      var data = await exe(sql) 
      // res.send(data);          
    }

  var sql = `UPDATE specification SET
                title = ?,
                subtitle = ?
              WHERE 
                 id = ?
        `  
      var data = await exe(sql,[d.title,d.subtitle,d.id])
      res.redirect("/admin/specification")
})

// delete specification
router.get("/delete_speci/:id",async function(req,res){
  var id = req.params.id;
  var sql = `DELETE FROM specification WHERE id ='${id}'`;
  var data = await exe(sql)
  res.redirect("/admin/specification");
})


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
