"use strict";

function drawLines(data){
 var lineData = [{'x':0,'y':30},{'x':10,'y':50}];
 var lineData = [];

  data.wave.forEach( function( t, i ){
    lineData.push({ y: Math.round(t*10000)/100, x: i });
  });

  var line = d3.svg.line()
    .x(function(d) { return d.x })
    .y(function(d) { return d.y })
    .interpolate('linear')

  var svg = d3.select('body')
    .insert('svg', ":first-child")
    .attr({
      "width": 1000,
      "height" : 200
    })

  var path = svg
    .append('path')
    .attr({
      'd' : line(lineData),
      'stroke': 'blue',
      'stroke-width': 0.25,
      'fill':'none',
    });

  var bds = svg.selectAll('div')
    .data(lineData)
      .enter().append('rect')
      .attr({
        'x' : function(d, i) { return i; },
        'y' : 0,
        'width' : 2,
        'height' : function(d) { return d.y },
        'fill' : 'rgba(100,100,200,0.75)'
      });
}

d3.json('http://localhost:8000/song', function(data){
  console.log('songdata:', data);

  drawLines(data);
});

