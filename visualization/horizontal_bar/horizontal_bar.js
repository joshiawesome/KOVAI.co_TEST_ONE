function Create_Horizontal_Bar(){

  var chart_div=document.getElementById("analitycal");

  var margin = {top: 10, right: 0, bottom: 20, left: 70},
      width = chart_div.offsetWidth - margin.left - margin.right,
      height = 170 - margin.top - margin.bottom;

  var svg = d3.select("#analitycal")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(responsivefy)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  d3.csv('../../assets/data/analitycal.csv',function(data){
    // console.log(data);

    var subgroups = data.columns.slice(1);

    //x-axis
    var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, width]);
    svg.append("g")
      .attr("class","xline")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    //y-axis
    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.Type; }))
    .padding(.2);
    svg.append("g")
      .attr("class","yline")
      .call(d3.axisLeft(y));

    //colors
    var color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#0be881','#3c40c6'])

    //appending the horizontal bars

   var bars=svg.selectAll("myRect")
   .data(data)
   .enter()
   .append("g");

   bars.append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.Type); })
    .attr("width", function(d) { return x(d.Percentage); })
    .attr("height", y.bandwidth() )
    .attr("fill", function(d) { return color(d.Type); });

    bars.append("text")
    .attr("class","label")
    .attr("x", function(d){ return x(d.Percentage) + 3;} )
    .attr("y", function(d) { return y(d.Type) + y.bandwidth()/2 + 4; })
    .text(function(d){
      return d.Percentage+"%";
    })


  });
}