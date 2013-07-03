var http = require('http')
  , util = require('util');


var routes = {
  user : require('./fakes').user,
  song : require('./fakes').song,
  songs : null,
  region : null,
  listening : null,
  userSong : null
};


var server = http.createServer( function ( req, res ) {

  var obj = {};

  console.log("Request", req.url);
  for ( var key in routes ){
    if ( req.url.match(key)) {
      console.log('key:', key);
      obj = routes[key];
    }
  }

  //console.log("obj:", util.inspect(obj, {colors: true}) );
  var response = JSON.stringify(obj);

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Length' : response.length,
    'Content-Type' : 'application/json'
  });

  res.write( response );
  res.end();
});

server.timeout = 10000;

server.listen(8000, function() {
  console.log("Resty Listening");
});

