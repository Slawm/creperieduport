// load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

// aide à traiter les requêtes post
app.use(bodyParser.urlencoded({extended: false}))

//permet de mettre le dossier "public" en / racine et appeler les pages html s'y trouvant"
app.use(express.static('./public'))

app.use(morgan('short')) // possible d'utiliser 'combined' pour plus de détails

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


// ROUTES

app.post('/user_create', (req, res) => {
    //utilise body-parser
    const name = req.body.create_name
    const password = req.body.create_password
    const email = req.body.create_email
    const DATE_FORMATER = require( 'dateformat' );
    var date = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );

    const queryString = "INSERT INTO users  (name, password, email, date) VALUES (?,?,?,?)"
    getConnection().query(queryString, [name, password, email, date], (err, results, fields) => {
        if (err) {
            console.log("failed to insert new user:" + err)
            res.sendStatus(500)
            return
        }
        console.log("inserted a new user with id:", results.insertedId)
        res.end()
    })

})

app.get("/", (req, res) => {
    console.log("responding to root route")
    res.send("hello from root")
})

app.get("/users", (req, res) => {
    console.log("fetching user with id: " + req.params.id)

    const userId = req.params.id
    const queryString = "SELECT * FROM users"
    getConnection().query(queryString, (err, rows, fields) => {
        if(err){
            console.log("failed to query for users: " + err)
            res.sendStatus(500)
            return
        }
        console.log("users fetched successfully")
        
        res.json(rows)
    })
})

app.get('/user/:id', (req, res) => {
    console.log("fetching user with id: " + req.params.id)

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE user_id = ?"
    getConnection().query(queryString, [userId], (err, rows, fields) => {
        if(err){
            console.log("failed to query for user: " + err)
            res.sendStatus(500)
            return
        }
        console.log("users fetched successfully")
        
        res.json(rows)
    })
    

})

// localhost:3003
app.listen(3003, () =>{
    console.log("server is up and listening on 3003")
})
