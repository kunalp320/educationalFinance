var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var request = require("request");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname});

});

app.post('/get_stock_quote', function(req, res) {
  var tickerSymbol = req.body.tickerSymbol;
  var requestURL = "http://dev.markitondemand.com/MODApis/Api/v2/Quote?symbol=" + tickerSymbol;
  request(requestURL, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      console.log(body);
    }
  });
  console.log("We got to the endpoint with Symbol: " + tickerSymbol);
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
