var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var stocks = {};
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname});

});

app.post('/save_info', function(req, res) {
  console.log(req.query.price);
  if(req.query.price != "undefined") {
    stocks[req.query.symbol] = req.query.price;
  }
  res.json({status: 200});
});

app.get('/getTickers', function(req, res) {
  res.json({"object" : stocks});
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
