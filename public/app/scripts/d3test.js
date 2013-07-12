d3.json('http://localhost:8000/song', function(data){
  console.log('songdata:', data);
  drawSong(data);
});

d3.json('http://localhost:8000/region', function(data){
  console.log('regiondata:', data)
  drawSection(data);
});

var lineData = [];

var song = {
  length: 60*12
};

var styles = {
  viewport: {
    height:200,
    width:1000,
    bgColor: 'black'
  },
  sound: {
    preColor : 'rgb(200,200,255)',
    postColor : 'rgb(100,100,200)',
    playColor : 'rgb(255,100,100)',
    height:100
  },
  region: {
    height: 10,
    defaultColor : 'rgb(200,100,100)'
  },
  active: {
    weight: 1,
    color: 'black',
    opacity: 1
  }
};

var svg = d3.select('.activeSong').append('svg')
  .attr({
    'height' : styles.viewport.height,
    'width' : styles.viewport.width
  });

svg.append('rect')
  .attr({
    'height' : styles.viewport.height,
    'width' : styles.viewport.width,
    'fill' : styles.viewport.bgColor
  });

function drawSong(data){
  data.wave.forEach( function( t, i ){
    lineData.push({ y: Math.round(t*10000)/100, x: i });
  });

  var songLine = svg.append('g')
    .attr({
      "transform" : "translate(0, " + styles.sound.height + ")",
      "width": styles.viewport.width,
      "height" : styles.sound.height
    });

  songLine.selectAll('rect')
  .data(lineData)
  .enter()
    .append('rect')
    .attr({
      'x' : function(d, i) { return i },
      'width' : 2,
      'height' : function(d) { return d.y },
      'fill' : styles.sound.preColor
    });
}

function drawSection(data){

  var svg = d3.select('.activeRegions')
  .insert('svg', ":first-child")
  .attr({
    "width": song.length,
    "height" : 100
  });

  var data = [data];

  var y = d3.scale.linear()
  .domain([0, styles.region.height])
  .range( [styles.region.height, 0]);

  var boxLoc = {
    x : function(d) {return d.start},
    y : y(10)
  };

  var wordBounds = svg.selectAll('div')
  .data(data)
  .enter().append('text')
    .attr({
      'fill': 'rgb(200,200,200)',
      'x' : boxLoc.x,
      'y' : boxLoc.y + 9,
      'font-size': 10
    })
    .text('Fuck');


  console.log(wordWidth);

  var box = svg.selectAll('div')
  .data(data)
  .enter().append('rect')
  .attr({
    'x': boxLoc.x,
    'y':boxLoc.y,
    'width':wordWidth,
    'height':10,
    'fill': "rgb(100,100,100)"
  });

  var word = svg.selectAll('div')
  .data(data)
  .enter().append('text')
  .attr({
    'fill': 'rgb(200,200,200)',
    'x' : boxLoc.x,
    'y' : boxLoc.y + 9,
    'font-size': 10
  })
  .text('Fuck');
}

function drawMarks(){
  var y = d3.scale.linear()
    .domain([0,song.length])
    .range([0,song.length])

  var marks = d3.svg.axis()
    .scale(y)
    .orient('bottom')
    .tickSize(5);


    console.log('marks,x',  y);

  var svg = d3.selectAll('.marks')
    .append('svg')
    .attr('height',25)
    .attr('transform','translate(0,15)');

  svg.append('g').attr('class', 'y axis').call(marks);
  // var songData = { length: 1000 };
  // var x = d3.scale.linear()
  //   .domain([0,1])
  //   .range([0, songData.length]);

  // var svg = d3.select('.axis').append('svg')
  // .attr({
  //   'width': songData.length,
  //   'height': 10
  // })
  // .append('g');

  // var width = 60*12;
  // var height = 200;

  // var time = {
  //   min : Math.floor(songData.length / 60),
  //   sec : songData.length
  // };

  // console.log('time.min:', time.min)
  // console.log('xticks', x.ticks(10));

  // var hash = d3.select('.activeRegion')
  //   .append('svg:svg')
  //   .attr({
  //     'width' : width,
  //     'height' : height
  //   });

  // console.log('time.min:', time.min);
}

drawMarks();

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
  .attr('fill', styles.sound.postColor)
  .attr('height', function(d) { return d.y })
  .ease('linear');
}

function do2() {
  playColor = 'rgb(100,200,200)';
  doThing();
}


