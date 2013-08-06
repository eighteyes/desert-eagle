function regions(num) {

var n1, n2, s1;
var count = num || 10;
var regions = [];
var str = "abcdefghijklmnopqrstuvwxyz";

for (var i = 1; i <= count; i++) {


  n1 = Math.round(Math.random() * 1000);
  n2 = Math.round(Math.random() * 1000);

  s1 = str[ Math.round(Math.random() * 25 ) ] + n1;

  var start = Math.min(n1, n2);
  var end = Math.max(n1, n2);
  var region = {
    start: start,
    end: end,
    length: end - start,
    depth: 1,
    user: s1
  };
  regions.push(region);
}
return regions;
}

module.exports = regions;