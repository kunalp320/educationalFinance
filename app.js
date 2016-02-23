var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname});

});

app.post('/get_stock_quote', function(req, res) {
  console.log("We got to the endpoint");
  console.log(req.body.TickerSymbol);
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
