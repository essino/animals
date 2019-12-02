//git
//http://127.0.0.1:8081/cutiepie

var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var mysql = require('mysql');

app.get('/cutiepie', function (req, res) {
    console.log(req.params);

    con.query("SELECT id, linkki FROM Elainkuvia", function (err, result, fields) {
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

app.get('/sweetassugar', function (req, res) {
  console.log(req.params);

  con.query("select Kommentti from Komentit where avain=id; ", function (err, result, fields) {
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
    console.log(req);
    console.log(res);
    console.log("body: ");
    console.log(req.body);
    console.log("params:");
    console.log(req.params);
    console.log("kuvaus: " + req.body.Kuvaus);
    //con.query("INSERT INTO Elainkuvia (Kuvaus, Elain, Linkki) VALUES ('"+req.params.descr+ "', '"+req.params.animal+"', '"+req.params.linkki+"');", function (err, result, fields) {
    con.query("INSERT INTO Elainkuvia (Kuvaus, Elain, Linkki) VALUES ('"+req.body.kuvaus+ "', '"+req.body.elain+"', '"+req.body.linkki+"');", function (err, result, fields) {
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
