var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.use(express.static('js-bundled'));
app.use(express.static('css'));
app.listen(port, function() {
  console.log("running at localhost: " + port)
});