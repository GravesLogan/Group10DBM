const express = require('express');
var fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/PortEntry.html");
});


app.listen(8080);