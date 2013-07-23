var express = require('express')
  , mongoose = require('mongoose')
  , restish = require('restish');

options = {
  port: 8000,
  routes : {
    user : require('./fakes').user,
    song : require('./fakes').song,
    regions : require('./fakes').regions,
    songs : null,
    listening : null,
    userSong : null
  }
}

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


restish(options);