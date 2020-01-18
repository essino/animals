//http://127.0.0.1:8081/cutiepie
//http://127.0.0.1:8081/puppies
//http://127.0.0.1:8081/postphoto

var express = require('express');
var app = express();
var url = require('url');

var cors = require('cors');
app.use(cors());

var mysql = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

  var q = url.parse(req.url, true).query;
  var avainID = q.Avain;
  var sql = "SELECT Kommentti " + "FROM Komentit " +  "WHERE Avain=?";

  console.log(q.Avain);

  con.query (sql, [avainID], function(err, result) {
    if (err)
      throw (err);
    else{
      console.log(result);

      res.send(JSON.stringify(result));

    }});
});

app.get('/sweetassugar', function (req, res) {

  console.log(req.params);


  var q = url.parse(req.url, true).query;
  var choice = q.Kuvaus;
  var sql = "SELECT id, Linkki " + "FROM Elainkuvia" + " WHERE Kuvaus=?";

  console.log(q.Kuvaus);

  con.query (sql, [q.Kuvaus], function(err, result) {
    let results = [];
    if (err){
      throw (err);
    }


    else{
      for (var i = 0; i < result.length; i++){
        results.push(result[i]);
      }
      console.log(result);
    }
    //sends the HTTP response
    res.send(results);

    });
});



app.get('/animalbabys', function (req, res) {
  console.log(req.params);

  var q = url.parse(req.url, true).query;
  var id = q.id;
  var sql = "SELECT Linkki " + "FROM Elainkuvia " +  "WHERE id=?";

  console.log(q.id);

  con.query (sql, [id], function(err, result) {
    if (err)
      throw (err);
    else{
      console.log(result);

      res.send(JSON.stringify(result));

    }});
});

app.post('/postphoto', function(req, res) {
//app.post('/postphoto/:descr/:animal/:linkki', function(req, res) {
  console.log(req);
  console.log(res);
  console.log("body!: ");
  console.log(req.body);
  console.log("params:");
  console.log(req.params);
  console.log("kuvaus: " + req.body.Kuvaus);

  //uusi kokeilu
  // var q = url.parse(req.url, true).query;
  // var id = q.id;


  //con.query("INSERT INTO Elainkuvia (Kuvaus, Elain, Linkki) VALUES ('"+req.params.descr+ "', '"+req.params.animal+"', '"+req.params.linkki+"');", function (err, result, fields) {
  con.query("INSERT INTO Elainkuvia (Kuvaus, Elain, Linkki) VALUES (?, ?, ?);",[req.body.kuvaus, req.body.elain, req.body.linkki], function (err, result, fields) {
    if (err) throw err;
  })
  res.send(req.body);



});

app.post('/postcomment', function(req, res) {


  console.log(req);
  console.log(res);
  console.log("body: ");
  console.log(req.body);
  console.log("params:");
  console.log(req.params);
  console.log("key: " + req.body.key);
  console.log("comment: " + req.body.comment);
  //con.query("INSERT INTO Elainkuvia (Kuvaus, Elain, Linkki) VALUES ('"+req.params.descr+ "', '"+req.params.animal+"', '"+req.params.linkki+"');", function (err, result, fields) {
  con.query("INSERT INTO Komentit (Kommentti, Avain) VALUES (?, ?);", [req.body.comment, req.body.key], function (err, result, fields) {
    if (err) throw err;
  });
  res.send(req.body);
  console.log("toimii");
});


var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)
})

//Cisco päälle?
var con = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

con.connect(function(err) {
  if (err) throw err;
});
