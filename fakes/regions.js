var n1, n2;
var count = 5;
var regions = [];

for ( var i = 1; i <= count; i++ ){
  n1 = Math.round(Math.random()*100);
  n2 = Math.round(Math.random()*100);

  var start = Math.min(n1, n2);
  var end = Math.max(n1, n2);
  var region = {
    start: start,
    end: end,
    depth: i
  };
  regions.push(region);
}

module.exports = regions;