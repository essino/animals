//http://127.0.0.1:8081/

var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var mysql = require('mysql');

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

var con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "animals"
});

con.connect(function(err) {
    if (err) throw err;
});
