var express = require('express')
  , mongoose = require('mongoose')

var app = express();

app.use(express.logger());
app.use(express.static(__dirname + '/public/app'));

app.get('/', function(req, res){

  res.writeHead(200, {
    "CACHE-CONTROL" : "no-cache"
  });

  res.sendFile('index.html')
});

app.listen(8124);