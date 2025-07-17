var util = require("util");
var mysql = require("mysql");

var conn = mysql.createConnection({
    host:"bwrpinxqdj3h79jv2b1n-mysql.services.clever-cloud.com",
    user:"u15mnkdtdskrl1ed",
    password:"pGfcynKPZ9pgGqJJSoJw",
    database:"bwrpinxqdj3h79jv2b1n"
})

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;