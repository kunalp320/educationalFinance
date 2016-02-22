var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname});
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
