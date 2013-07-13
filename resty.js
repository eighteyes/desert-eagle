var http = require('http')
  , util = require('util');

var server = http.createServer( function ( req, res ) {

 // console.log( "CACHE", require.resolve('./fakes'), require.cache[require.resolve('./fakes')] );

  var routes = {
    user : require('./fakes').user,
    song : require('./fakes').song,
    regions : require('./fakes').regions,
    songs : null,
    listening : null,
    userSong : null
  };

  var obj = {};

  for ( var key in routes ){
    if ( req.url.match(key)) {
      // console.log('key:', key);
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

