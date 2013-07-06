"use strict";

var lineData = [];
var preColor = 'rgb(200,200,255)';
var postColor = 'rgb(100,100,200)';
var playColor = 'rgb(255,100,100)';

function drawLines(data){

  data.wave.forEach( function( t, i ){
    lineData.push({ y: Math.round(t*10000)/100, x: i });
  });

  var svg = d3.select('.activePlay')
    .insert('svg', ":first-child")
    .attr({
      "width": 1000,
      "height" : 200
    })

  var bds = svg.selectAll('div')
    .data(lineData)
      .enter().append('rect')
      .attr({
        'x' : function(d, i) { return i; },
        'y' : 10,
        'width' : 2,
        'height' : function(d) { return d.y },
        'fill' : preColor
      });
}

function drawSection(data){

  var svg = d3.select('.activePlay')
   .insert('svg', ":first-child")
    .attr({
      "width": 1000,
      "height" : 100
    });

    var data = [data];

  var box = svg.selectAll('div')
    .data(data)
      .enter().append('rect')
      .attr({
        'x': function(d) {return d.start},
        'y':0,
        'width':100,
        'height':15,
        'fill': "rgb(100,100,100)"
      });

  var word = svg.selectAll('div')
    .data(data)
    .enter().append('text')
    .attr({
      'fill': 'rgb(0,0,0)',
      'width' : 100,
      'x' : 10,
      'y' : 10,
      'height' : 100,
      'stroke' : 'black',
      'font-size': 16
    })
    .text('Fuck');
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
  drawSection(data);
})

