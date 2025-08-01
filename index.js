var express =require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");


var user = require("./routes/user");
var admin = require('./routes/admin');



var student = require("./routes/student");
var teacher = require("./routes/admin");

var app = express();




app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());



app.use(upload());
app.use(express.static("public/"))
app.use(session({
    secret:"asdfghjkl",
    saveUninitialized:"true",
    resave:"true"
}))

app.use((req,res,next) => {
    res.locals.user = req.session.user;
    next();
});


app.use("/",user);
app.use("/stu",student);
app.use("/admin",admin);





app.listen(1000);