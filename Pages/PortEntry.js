const express = require('express');
var fs = require('fs');
const cors = require("cors")
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'Port_Management_System'
})

connection.connect()

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/PortEntry.html");
});

app.get("/TEST", (req, res) => {
    console.log("A")

    const query = 'SELECT * FROM Trucks';
    connection.query(query, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
        }
    });
})


app.listen(8080);