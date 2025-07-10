var express =require("express");
var bodyparser= require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");


var user = require("./routes/user");
var admin = require('./routes/admin');



var student = require("./routes/student");
var teacher = require("./routes/teacher");
var dashboard = require("./routes/dashboard");
var app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(upload());
app.use(express.static("public/"))
app.use(session({
    secret:"asdfghjkl",
    saveUninitialized:"true",
    resave:"true"
}))

app.use("/",user);
app.use("/add",admin);
app.use("/stu",student);
app.use("/teach",teacher);
app.use("/dash",dashboard);




app.listen(1000);