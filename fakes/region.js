var n1, n2;

n1 = Math.round(Math.random()*100);
n2 = Math.round(Math.random()*100);

var start = Math.min(n1, n2);
var end = Math.max(n1, n2);

module.exports = {
  user: null,
  start: start,
  end: end
};