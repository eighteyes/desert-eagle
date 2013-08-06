var express = require('express')
  , mongoose = require('mongoose')
  , restish = require('restish')
  , fs = require('fs')

  var manyRegions = require('./fakes').regions;
  var regions = manyRegions();

options = {
  port: 8000,
  routes : {
    user : require('./fakes').user,
    song : require('./fakes').song,
    regions : regions,
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
  console.log("lol" )
  res.sendFile('index.html');
});

app.get('/audio/:sound', function(req, res) {
    var filePath = 'audio/mp3/' + req.params.sound + '.mp3';
    var stat = fs.statSync(filePath);



    res.writeHead(200, {
       "Content-Type": "audio/mpeg",
      'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

});

app.listen(8124);


restish(options);