"use strict";

var lineData = [];
var preColor = 'rgb(200,200,255)';
var postColor = 'rgb(100,100,200)';
var playColor = 'rgb(255,100,100)';

function drawLines(data){

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
    })
  ;

  var bds = svg.selectAll('div')
    .data(lineData)
      .enter().append('rect')
      .style("pointer-events", "all")
      .attr({
        'x' : function(d, i) { return i; },
        'y' : 0,
        'width' : 2,
        'height' : function(d) { return d.y },
        'fill' : preColor
      });

  var transition = d3.transition()
    .duration(1000)
    .attr('height', 100)
    .ease('linear');


    var playHead = function() {
      var bar = d3.select(this);
      bar.transition().attr({
        'height': 100,
        'fill': 'rgba(200,200,255,1)'
      });
    }

    var leaveHead = function() {
      var bar = d3.select(this);
      var h = bar.attr('height');
      bar.transition().attr({
        'height': function (d) { return d.y },
        'fill': 'rgba(100,100,155,1)'
      });
    }


    d3.selectAll('svg rect')
      .on('mouseover', playHead)
      .on('mouseout', leaveHead);
}

 function doThing() {
    d3.selectAll('svg rect').transition()
      .delay( function(d, i){ return i*100; })
      .duration(500)
      .attr('height', 150)
      .attr('fill', playColor)
      .ease('linear');



    d3.selectAll('svg rect').transition()
     .delay( function(d, i) { return i*100 + 500 } )
     .duration(500)
     .attr('fill', postColor)
     .attr('height', function(d) { return d.y })
     .ease('linear');
}

function do2() {
  playColor = 'rgb(100,200,200)';
  doThing();
}


d3.json('http://localhost:8000/song', function(data){
  console.log('songdata:', data);

  drawLines(data);
});

d3.json('http://localhost:8000/region', function(data){
  drawSections(data);
})

