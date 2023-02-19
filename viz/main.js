category = 'Larceny-theft'
function onCategoryChanged() {
  var select = d3.select('#crimeSelect').node();
  // Get current value of select element
  category = select.options[select.selectedIndex].value;
  update(x.invert(currentValue), category)

        //append tooltip
        svg.call(toolTip);
        actMaxCircles.on('mouseover', toolTip.show)
        .on('mouseout', toolTip.hide);
  // Update chart with the selected category of letters
  // updateChart(category)
}

var svg = d3.select('.temperature');

// create tooltip
var toolTip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-12, 0])
  .html(function(d) {
      return "<h5> Month: "+ d.date + '<br>'+ "Total of crimes: "+d.parent_count +"<br> crime rate (per 100K): "+d.crime_rate+"</h5>";
  });


// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 100, r: 100, b: 100, l: 100};
var cellPadding = 10;

var chartG = svg.append('g')
    .attr('transform', 'translate(50,200)')
    .attr('class','lineChart');
var cellWidth = (svgWidth - padding.l - padding.r) / 2;
var cellHeight = (svgHeight - padding.t - padding.b) / 2;

var xScale = d3.scaleTime().range([0, svgWidth-100]);
var yScale = d3.scaleLinear().range([cellHeight - cellPadding, 0]);
var yScaleright = d3.scaleLinear().range([cellHeight - cellPadding, 0]);
var parseTime = d3.timeParse("%Y-%m");
var formartTime = d3.timeFormat("%Y-%m");
xAxis = xScale.domain([parseTime('2018-01'),parseTime('2023-02')]);
//yAxis = yScale.domain([0,350]);

var xAxis = d3.axisBottom(xScale)
    chartG.append('g').attr('class','x axis').call(xAxis).attr('transform', function(){
        return 'translate(0,'+ cellHeight + ')';
    }).selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")
    .attr("font-weight","bold");
//var yAxis = d3.axisLeft(yScale)
//    chartG.append('g').attr('class','y axis').call(yAxis)


//slider
var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("2018-1-1"),
    endDate = new Date("2023-02-14");

var margin = {top:50, right:50, bottom:0, left:50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var svg = d3.select("#vis")
//     .select('svg')
// slider
////////// slider //////////

var moving = false;
var currentValue = 0;
var targetValue = width;

var playButton = d3.select("#play-button");

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + "30" + "," + 100 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          update(x.invert(currentValue), category);
                //append tooltip
  svg.call(toolTip);
  actMaxCircles.on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);

        })
    );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return formatDate(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0,-20)")

//data

d3.csv('burglary.csv',dataPreprocessor).then(function(dataset) {
  burglary = dataset
  // Create map for each attribute's extent

});

d3.csv('motor.csv',dataPreprocessor).then(function(dataset) {
  motor = dataset

  // Create map for each attribute's extent
});

d3.csv('property.csv',dataPreprocessor).then(function(dataset) {
  property = dataset

  // Create map for each attribute's extent
});

d3.csv('assault.csv',dataPreprocessor).then(function(dataset) {
  assault = dataset

  // Create map for each attribute's extent
});

d3.csv('theft.csv',dataPreprocessor).then(function(dataset) {
  theft = dataset
  maxFreq = d3.max(dataset, function(d){
    return d.crime_rate;
});
  // linePlot(dataset)
  // precipitation(dataset)

  playButton
  .on("click", function() {
  var button = d3.select(this);
  if (button.text() == "Pause") {
    moving = false;
    clearInterval(timer);
    // timer = 0;
    button.text("Play");

      //append tooltip
  svg.call(toolTip);
  actMaxCircles.on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);
  actMinCircles.on('mouseover', toolTip.show)
  .on('mouseout', toolTip.hide);
  } else {
    moving = true;
    timer = setInterval(step, 100);
    button.text("Pause");
  }
  console.log("Slider moving: " + moving);
})
});

function prepare(d) {
  d.id = d.id;
  d.date = parseDate(d.date);
  return d;
}

function step() {
  update(x.invert(currentValue), category);
  currentValue = currentValue + (targetValue/151);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    // timer = 0;
    playButton.text("Play");
    console.log("Slider moving: " + moving);
  }
}



function linePlot(data) {

  var countMax = 0
  chartG.select('.linearea').remove()
  d3.select('.countDays').remove()
  linearea = chartG.append('g').attr('class','linearea')

  //draw actual data
    var maxLine = d3.line()
    .x(function(d) {
      return xScale(parseTime(d.date)); })
    .y(function(d) { return yScale(d.crime_rate); });

    /* add hist
    var count = linearea.append('rect').datum(data).attr("width", 20)
    .attr('height', function(d,i){
      console.log(d[i].parent_count);
      return yScaleright(d[i].parent_count)})
    .attr('transform', function(d,i) {
        console.log(i)
        return 'translate('+[i * 20 + 4,0]+')';
      })*/

  //Data join for paths
  var drawMaxLine = linearea.append("path")
  .datum(data)
  .attr("class", "maxLine")
  .attr("d", maxLine)


  // var labelActualMax = linearea.append("text")
  //       .text("actual max temperature")
  //       .attr("class", "labelActual")
  //       .attr("x", 280)
  //       .attr("y", 0)


  // var labelActualmin = linearea.append("text")
  // .text("actual min temperature")
  // .attr("class", "labelActual")
  // .attr("x", 270)
  // .attr("y",150)



  // add circles and append tooltip
  actMaxCircles = linearea.selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", function(d) {
          if (d.actual_max_temp > d.average_max_temp) {
            countMax = countMax + 1
            return "white"
          } else {
            return "#0066a3"
          }
        })
        .attr("stroke", "#ee3636")
        .attr("cx", function(d) { return xScale(parseTime(d.date)) })
        .attr("cy", function(d) { return yScale(d.crime_rate) })
        .attr("r", 2)

  // actMaxCircles.on('mouseover', toolTip.show)
  //       .on('mouseout', toolTip.hide);





    var avgArea = d3.area()
    .x(function(d) {return xScale(parseTime(d.date)); })
      .y0(function  (d) { return yScale(d.average_min_temp); })
      .y1(function(d) { return yScale(d.average_max_temp); });
    var drawRecArea = linearea.append("path")
    .datum(data)
    .attr("class", "avgArea")
    .attr("d", avgArea)

    // var labelAvgMax = linearea.append("text")
    // .text("average max temperature")
    // .attr("class", "avgLabel")
    // .attr("x", 1300)
    // .attr("y", 20)

    // var labelAvglmin = linearea.append("text")
    // .text("average min temperature")
    // .attr("class", "avgLabel")
    // .attr("x", 1300)
    // .attr("y", 160)

    // svg.append("text")
    //     .attr("x", 280)
    //     .attr("y", 70)
    //     .attr('class','countDays')
    //     .text('There were ' + countMax + " days of the year when the actual max temperature was above the average max temeperature.")
    //     .attr('transform','translate(-210,20)')
    //     .attr('fill','#F71921')

}

function update(h, city) {
  var cityDs = []
  if (city == 'Larceny-theft') {
    cityDs = theft;
    d3.selectAll("g.y.axis").remove();
    yAxis = yScale.domain([0,368])
    var yAxis = d3.axisLeft(yScale)
    chartG.append('g').attr('class','y axis').call(yAxis)
    /*
    yAxisright = yScaleright.domain([0,2785])
    var yAxisright = d3.axisRight(yAxisright)
    chartG.append('g').attr('class','y axis right').call(yAxisright).attr('transform', 'translate(1400,0)')
*/
  } else if (city == 'Assault Offenses') {
    cityDs = assault;
    d3.selectAll("g.y.axis").remove();
    yAxis = yScale.domain([0,152])
    var yAxis = d3.axisLeft(yScale)
    chartG.append('g').attr('class','y axis').call(yAxis)
  } else if (city == 'Burglary') {
    cityDs = burglary;
    d3.selectAll("g.y.axis").remove();
    yAxis = yScale.domain([0,141])
    var yAxis = d3.axisLeft(yScale)
    chartG.append('g').attr('class','y axis').call(yAxis)
  } else if (city == 'Destruction') {
    cityDs = property
    d3.selectAll("g.y.axis").remove();
    yAxis = yScale.domain([0,96])
    var yAxis = d3.axisLeft(yScale)
    chartG.append('g').attr('class','y axis').call(yAxis)
  } else if (city == 'Motor Vehicle Theft') {
    cityDs = motor;
    d3.selectAll("g.y.axis").remove();
    yAxis = yScale.domain([0,91])
    var yAxis = d3.axisLeft(yScale)
    chartG.append('g').attr('class','y axis').call(yAxis)
  }
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));

  // filter data set and redraw plot
  var newData = cityDs.filter(function(d) {
    return parseTime(d.date) < h;
  })
  linePlot(newData);
}


function dataPreprocessor(row) {
  return {
      'date': row['month'],
      'crime_rate': +row['crime_rate'],
      'parent_count': +row['parent_count']
  };
}

