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
app.use(express.static(__dirname));

console.log(__dirname)

app.get("/TEST", (req, res) => {
    const query = 'SELECT * FROM Truck';
    connection.query(query, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);

            results.forEach(el => {
                console.log(el.TruckID)
            });
        }
    });
})


app.listen(8080, () => console.log(`Listening on 8080`));