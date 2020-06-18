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




// ROUTES

const router = require('./routes/user.js')

app.use(router)



app.get("/", (req, res) => {
    console.log("responding to root route")
    res.send("hello from root")
})

// localhost:3003
app.listen(3003, () =>{
    console.log("server is up and listening on 3003")
})
