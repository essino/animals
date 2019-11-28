//git
//http://127.0.0.1:8081/cutiepie

var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var mysql = require('mysql');

app.get('/cutiepie', function (req, res) {
    console.log(req.params);

    con.query("SELECT linkki FROM Elainkuvia", function (err, result, fields) {
        if (err) throw err;
        let results = [];
        if (result.length){
            for (var i = 0; i < result.length; i++){
                results.push(result[i]);
            }
            console.log(result);
        }
        //sends the HTTP response
        res.send(results);
    })
});

app.get('/puppies', function (req, res) {
    console.log(req.params);

    con.query("select Kommentti from Komentit where avain=1" , function (err, result, fields) {
        if (err) throw err;
        let results = [];
        if (result.length){
            for (var i = 0; i < result.length; i++){
                results.push(result[i]);
            }
            console.log(result);
        }
        //sends the HTTP response
        res.send(results);
    })
});

app.post('/table', function(req, res) {
    console.log(req.body);
    console.log(req.params);
    con.query("INSERT INTO elainkuva (elain, kuvaus, linkki) VALUES ('lehmä', 'kaunis', 'https://upload.wikimedia.org/wikipedia/commons/3/32/SalersBreed_Cow_5.JPG');", function (err, result, fields) {
        if (err) throw err;
    })
    res.send(req.body);
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})

//Cisco päälle?
var con = mysql.createConnection({
    host: "mysql.metropolia.fi",
    user: "essinor",
    password: "kissa",
    database: "essinor"
});

con.connect(function(err) {
    if (err) throw err;
});
