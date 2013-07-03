var fakeSong = function makeFakeSong() {
  var a = [];
  for (var i = 0; i < 1000; i++) {
    a.push(Math.abs(Math.floor(Math.random()*Math.sin(i)*1000) / 1000));
  }
  return a;
};

module.exports = {
  wave: fakeSong(),
  name: "testName",
  date: Date.now(),
  time: 1000
};

