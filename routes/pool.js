const mysql = require('mysql')
var pool = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '2406',
    database: 'quickcomm',
    multiplestatements: true,
})
module.exports = pool