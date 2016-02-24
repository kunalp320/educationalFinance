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

app.post('/save_info', function(req, res) {
  console.log(req.query);
  res.json({status: 200});
});

app.get('/getTickers', function(req, res) {
  res.json({"AAPL" : "500"});
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
