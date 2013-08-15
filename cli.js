var userArgs = process.argv.slice(2);
var fs = require('fs');
var _ = require('underscore');
var async = require('async');

var cmd = userArgs[0];
var target = userArgs[1] || '.';
var exec = require('child_process').exec;

if (cmd.indexOf('process') === 0){

  console.log('Starting at directory: ' + process.cwd());
  try {
    process.chdir(target);
    console.log('New directory: ' + process.cwd());
  }
  catch (err) {
    console.log('chdir failed: ' + err);
  }



  var i = total = 0;

  async.waterfall([
    function (cb){
      exec('mkdir ../mp3', function(){
        cb()
      });
    },
    function (cb) {
      fs.readdir( '.',  function ( err, files ){
        if (err) throw err;
        files.forEach( function (f) {
          if ( f.indexOf('.aiff') > -1) {
            total++;
            var sndName = f.slice(0, -5)
            cb(null, f, sndName );
          }
        });
      });
    },
    function (file, name, cb) {
      var comm = 'ffmpeg -i '+ file +' -q:a 0 '+ name +'.mp3';
      console.log('comm:', comm)
      exec(comm,
        function(err, stdout, stderr) {
          if (err) throw err;
          console.log("mp3:", name);
          cb( null, name+'.mp3' );
        })
    },
    function (  mp3file, cb ){
      console.log('moving(f):', mp3file)
      exec('mv ' + mp3file + ' ../mp3/' + mp3file,
        function(err, stdout, stderr) {
          if (err) throw err;
          console.log('Moved:', mp3file);
          if (i === total - 1 ){
            cb(null, total);
          }
          i++;
        }
        )
    }],
    function (err, i) {
      console.log('Done with ', total);
    }
    );


}
