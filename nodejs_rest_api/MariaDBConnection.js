const mysql = require('mysql')

// CONNECTION

function getConnection(){
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '159753',
        database: 'cdp'
    })
}

const connection = getConnection()

module.exports = connection