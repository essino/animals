//git

var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var mysql = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/cutiepie', function (req, res) {
    console.log(req.params);

    con.query("SELECT elain FROM Elainkuvia", function (err, result, fields) {
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

app.post('/postphoto', function(req, res) {
//app.post('/postphoto/:descr/:animal/:linkki', function(req, res) {

    console.log(req.body);
    //console.log(req.params);
    //console.log(req.params.linkki);
    //con.query("INSERT INTO Elainkuvia (Kuvaus, Elain, Linkki) VALUES ('"+req.params.descr+ "', '"+req.params.animal+"', '"+req.params.linkki+"');", function (err, result, fields) {
    con.query("INSERT INTO Elainkuvia (Kuvaus, Elain, Linkki) VALUES ('"+req.body.Kuvaus+ "', '"+req.body.Elain+"', '"+req.body.Linkki+"');", function (err, result, fields) {
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
