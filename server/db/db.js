const mysql = require('mysql')
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'myblog'
})

module.exports = db