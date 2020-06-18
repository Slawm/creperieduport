// Containes all user related routes
const express = require('express')
const router = express.Router()
const getConnection = require('../MariaDBConnection.js')
const mysql = require('mysql')


module.exports = router

router.get("/users", (req, res) => {
    console.log("fetching user with id: " + req.params.id)

    const userId = req.params.id
    const queryString = "SELECT * FROM users"
    getConnection.query(queryString, (err, rows, fields) => {
        if(err){
            console.log("failed to query for users: " + err)
            res.sendStatus(500)
            return
        }
        console.log("users fetched successfully")
        
        res.json(rows)
    })
})

router.get('/user/:id', (req, res) => {
    console.log("fetching user with id: " + req.params.id)

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE user_id = ?"
    getConnection.query(queryString, [userId], (err, rows, fields) => {
        if(err){
            console.log("failed to query for user: " + err)
            res.sendStatus(500)
            return
        }
        console.log("users fetched successfully")
        
        res.json(rows)
    })
    

})

router.post('/user_create', (req, res) => {
    //utilise body-parser
    const name = req.body.create_name
    const password = req.body.create_password
    const email = req.body.create_email
    const DATE_FORMATER = require( 'dateformat' );
    var date = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );

    const queryString = "INSERT INTO users  (name, password, email, date) VALUES (?,?,?,?)"
    getConnection.query(queryString, [name, password, email, date], (err, results, fields) => {
        if (err) {
            console.log("failed to insert new user:" + err)
            res.sendStatus(500)
            return
        }
        console.log("inserted a new user with id:", results.insertedId)
        res.end()
    })

})