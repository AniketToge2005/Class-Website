var util = require("util");
var mysql = require("mysql");

var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"student_admin"
})

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;