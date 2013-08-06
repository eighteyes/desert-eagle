/*jslint white: false, loopfunc: false */

d3.json('http://localhost:8000/song', function(data) {
  console.log('songdata:', data);
  drawSong(data);
});

d3.json('http://localhost:8000/regions', function(data) {
  console.log('regiondata:', data);
  drawRegions(data);
});

var lineData = [];
var songLine = [];
var songLineRegions = [];

var song = {
  length: 60 * 12
};

var styles = {
  viewport: {
    height: 200,
    width: 1000,
    bgColor: 'black'
  },
  sound: {
    preColor: 'rgb(200,200,255)',
    postColor: 'rgb(100,100,200)',
    playColor: 'rgb(255,100,100)',
    height: 100
  },
  regions: {
    height: 100,
    fillColor: 'aliceblue',
    opacity: 0.5
  },
  region: {
    height: 10,
    defaultColor: 'rgb(200,100,100)'
  },
  active: {
    weight: 1,
    color: 'black',
    opacity: 1
  }
};

var svg = d3.select('.activeSong').append('svg')
  .attr({
    'height': styles.viewport.height,
    'width': styles.viewport.width
  });

svg.append('rect')
  .attr({
    'height': styles.viewport.height,
    'width': styles.viewport.width,
    'fill': styles.viewport.bgColor
  });

function drawSong(data) {
  data.wave.forEach(function(t, i) {
    if ( i % 2 == 0){
      lineData.push({
        y: Math.round(t * 5000) / 100,
        x: i
      });
    }
  });

  console.log("Waves", data.wave.length)
  songLine = svg.append('g')
    .attr({
      'class': 'songLine',
      'transform': 'translate(0,' + styles.sound.height + ')'
    });

  songLineRegions = songLine.selectAll('rect')
    .data(lineData)
    .enter()
    .append('rect')
    .attr({
      'x': function(d, i) {
        return i*2
      },
      'width': 2,
      'height': function(d) {
        return d.y
      },
      'fill': styles.sound.preColor
    });
}

regionData = [];
/* data = [ { start: , depth: , end:, length: } ] */
function drawRegions(data) {
  svg.selectAll('.region').remove();

  data.forEach( function(d,i) {
    regionData.push(d);
  });

  // sort by start
  regionData.sort( function(a, b) { return a.start - b.start });
  // quick stack
  regionData.forEach( function(d, i, a) {
    var targetDepth = 1;
    var blockedRows = [];
    for ( var j = i; j >= 1; j-- ){
    // go through list in reverse order from current
        if ( d.start < a[j-1].end ) {
          // push up for each layer
          targetDepth++;
        }
    }
    console.log('targetDepth:', targetDepth)

    for ( var j = i; j >= 1; j-- ){
      if ( (d.start > a[j-1].end) && ( a[j-1].depth < targetDepth ) ) {
        // push down for each layer that ended &&
        console.log("down", d.user, "on", a[j-1].user, a[j-1].depth)

        //once you go all the way down, stop looking
        targetDepth = a[j-1].depth;
      }
    }
    a[i].depth = targetDepth;

    //console.log(d, i, a);
  });

  //input start code, find depth of first workable gap
  function findGap(start, length){
    regionData.forEach( function() {

    });
  }

  var color = d3.scale.linear()
    .range(['#dad', '#331']);

  var section = svg.append('g')
    .attr({
      'class': 'region',
      'transform': 'translate(0,' + styles.sound.height + ')',
      'width': styles.viewport.width,
      'height': styles.viewport.height - styles.sound.height
    });

  var region = section.selectAll('rect')
    .data(regionData)
    .enter()
    .append('g');

  region
    .append('rect')
    .attr({
      'x': function(d) {
        return d.start;
      },
      'y': function(d) {
        return -d.depth * styles.region.height;
      },
      'width': function(d) {
        return d.length;
      },
      'height': styles.region.height,
      'fill': styles.region.defaultColor
    });

  region
    .insert('text')
    .attr({
      'x': function(d) {
        return d.start;
      },
      'y': function(d) {
        return -d.depth * styles.region.height;
      },
      'fill': 'rgb(200,200,100)',
      'font-size': 14,
      'dy': 10
    }).text( function(d) { return d.user })

  var layers = [{
    "name": "apples",
    "values": [{
      "x": 0,
      "y": 91
    }, {
      "x": 1,
      "y": 290
    }]
  }, {
    "name": "oranges",
    "values": [{
      "x": 0,
      "y": 9
    }, {
      "x": 1,
      "y": 49
    }]
  }];

}

function drawMarks() {
  var y = d3.scale.linear()
    .domain([0, song.length])
    .range([0, song.length])

  var marks = d3.svg.axis()
    .scale(y)
    .orient('bottom')
    .tickSize(5);

  console.log('marks,x', y);

  var svg = d3.selectAll('.marks')
    .append('svg')
    .attr('height', 25)
    .attr('transform', 'translate(0,15)');

  svg.append('g').attr('class', 'y axis').call(marks);

}

drawMarks();

//start draw

function doThing(num) {
  var newRegionInfo = [];
  $('.activeRegion').each( function() {
    newRegionInfo.push({
      start: $(this).attr('x'),
      length: $(this).attr('width'),
      end: $(this).attr('x') + $(this).attr('width'),
      depth: 1,
      user: "thisuser"
    });
    $(this).remove();
  });
  drawRegions(newRegionInfo)
}

function play() {
  d3.selectAll('svg g rect').transition()
    .delay(function(d, i) {
      return i * 100 + 500
    })
    .duration(500)
    .attr('fill', styles.sound.postColor)
    .attr('height', function(d) {
      return d.y
    })
    .ease('linear');
}

function designateRegion (e) {
  var start = e.data.start;
  var target = e.data.target;
  var diff = e.offsetX - start;

  target.attr({
    'width' : diff
  });
}


$('svg').on('mousedown', function(e) {

  console.log('start:', e.offsetX )

  var regionInfo = { start : e.offsetX };

  regionInfo.target = svg.append('rect')
    .attr({
      'class': 'activeRegion',
      'height': styles.regions.height,
      'y': 0,
      'x': regionInfo.start,
      'fill': styles.regions.fillColor,
      'opacity': styles.regions.opacity
    });


  $(this).one('mouseup', function(e) {
    $(this).off('mousemove', designateRegion)
  })

  $(this).on('mousemove', regionInfo, designateRegion)
})
