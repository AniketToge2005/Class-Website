var express = require("express");
var router = express.Router();
var exe = require('./../connection');



router.get("/",async function (req, res) {
  var contact_info=await exe(`SELECT * FROM contact_info`)

  var slider = await exe(`SELECT * FROM slider`)
  var specification = await exe(`SELECT * FROM specification`)
  var obj={"contact_info":contact_info[0],"slider":slider,"specification":specification}

  res.render("user/home.ejs",obj);
  // console.log(slider[0].photo)
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

router.post("/save_login",async function(req,res){
  var d = req.body;
  var sql = `SELECT * FROM students WHERE std_email = ? AND std_phone = ?`
  var data = await exe(sql,[d.email,d.password]);
  
  if(data.length > 0){
    
    req.session.user = data[0];
    res.redirect("/stu");
  }
  else{
    res.send("login Failed")
  }
})


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

router.get("/new_offer", async function (req, res) {
  try {
    const classId = req.query.class_id || "all";

    const contact_info = await exe(`SELECT * FROM contact_info`);
    const offers = await exe(`SELECT * FROM offers order by class_id asc`);

    // Filter offers by classId (if not 'all')
    let filteredOffers = offers;
    if (classId !== "all") {
      filteredOffers = offers.filter(offer => offer.class_id == classId);
    }

    const obj = {
      contact_info: contact_info[0],
      aniket: filteredOffers,
      selectedClassId: classId
    };

    res.render("user/new_offer.ejs", obj);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



// --------------------------------------------------------------------------



module.exports = router;
