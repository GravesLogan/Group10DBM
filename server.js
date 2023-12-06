const express = require('express'); 
const app = express(); 
const mysql = require('mysql')
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'Port_Management_System'
})

connection.connect()


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

// load main
app.get('/', (req, res)=>{ 
    res.render("index")
}) 

// switch to all the tabs
app.get('/:link', urlencodedParser, (req, res)=>{
    try {
        res.render(String(req.url).substring(1))

        if (String(req.url).search(".css") == -1) {
            res.render(String(req.url).substring(1))
        }
    } catch {}
}) 

app.post('/ShipReg', urlencodedParser, (req, res)=>{ 
    let shipName = req.body.ShipName

    if (shipName == undefined || !shipName.replace(/\s/g, '').length) {
        res.render("ShipReg", {output: "FAILED: Name must contain something other than spaces."})
        return;
    }

    const query = `SELECT ShipID FROM Ship WHERE ShipName = "${req.body.ShipName}"`;
    let output = "Success!"

    connection.query(query, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            if (results.length > 0) {
                output = "FAILED: Ship Name exists in Database"
            } else {
                // put it in
                const query2 = `INSERT INTO Ship (ShipName) VALUES ("${req.body.ShipName}")`
                connection.query(query2, (error2, results2) => {
                    if (error2) console.log(error2);
                    else console.log(results2);
                })
            }
        }
        try {
            res.render("ShipReg", {output: output})
        } catch {}
        
    });
}) 

// Server setup 
app.listen(8080 , ()=>{ 
    console.log("server running"); 
});
