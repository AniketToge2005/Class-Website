var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  // 
  var obj={"contact_info":contact_info[0]}
  res.render("user/home.ejs",obj);

});
router.get("/services",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/services.ejs",obj);

});
router.get("/contact",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/contact.ejs",obj);

});
router.get("/about",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/about.ejs",obj);

});
router.get("/courses",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class&courses.ejs",obj);

});
router.get("/loginpop",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/loginpop.ejs",obj);

});
router.get("/student",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/student.ejs",obj);

});
router.get("/loginstudent",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/loginstudent.ejs",obj);

});

router.get("/loginadmin",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/loginadmin.ejs",obj);

});

router.get("/profile",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/profile.ejs",obj);
})

router.get("/class5",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class5.ejs",obj);
})

router.get("/class6",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class6.ejs",obj);
})

router.get("/class7",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class7.ejs",obj);
})

router.get("/class8",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class8.ejs",obj);
})

router.get("/class9",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class9.ejs",obj);
})

router.get("/class10",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class10.ejs",obj);
})

router.get("/class11",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class11.ejs",obj);
})

router.get("/class12",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/class12.ejs",obj);
})

router.get("/new_offer",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)
  var obj={"contact_info":contact_info[0]}
  res.render("user/new_offer.ejs",obj);
})

// 



module.exports = router;
