var util = require("util");
var mysql = require("mysql");

var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"class_website"
})

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;