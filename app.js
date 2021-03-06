var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var request = require("request");
//var mongoose = require("mongoose");
var http = require("http");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("WE ARE IN");
});

*/


var stocks = {};
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname});
});

app.get('/stockQuote', function(req, res) {
  var stockQuoteRequest = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + req.query.symbol;
  var stockQuote = {};
  request(stockQuoteRequest, function(error, response, body) {
    jsonResponse = JSON.parse(body);
    var ticker = "";
    for(var key in jsonResponse) {
      if(key == "Name") {
       ticker = jsonResponse[key];
      } else if(key === "MSDate" || key === "Status" || key === "Timestamp" || key === "Symbol") {
        continue;
      } else {
        stockQuote[key] = jsonResponse[key];
      }
    }
    res.json({"stockQuote" : stockQuote, "ticker" : ticker});
  });

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

app.listen(process.env.PORT || 8080, function() {
  console.log("Listening on port 8080");
});
