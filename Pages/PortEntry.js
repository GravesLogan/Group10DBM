const express = require('express');
var http = require('http');
var url = require('url');
var fs = require('fs');
const cors = require("cors")
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'testDB'
})

connection.connect()

http.createServer(function (req, res) {
    const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

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

    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        } 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);