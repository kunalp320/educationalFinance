var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname});

});

app.get('/get_stock_quote', function(req, res) {
  console.log("We got to the endpoint");
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
