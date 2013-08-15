var express = require('express')
  , mongoose = require('mongoose')
  , restish = require('restish')
  , fs = require('fs')
  , sounder = require('sounder')

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
};

var app = express();

app.use(express.logger());
app.use(express.static(__dirname + '/public/app'));

app.get('/', function(req, res){
  res.writeHead(200, {
    "CACHE-CONTROL" : "no-cache"
  });
  res.sendFile('index.html');
});

app.get('/info/:sound', function( req, res ){
  sounder.readSound( req.params.sound + '.aiff', 'audio/aiff', function(err, sound) {
    res.json( sound );
  });
})

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