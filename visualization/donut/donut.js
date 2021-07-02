function Create_Donut(div_id,number){
  // console.log(div_id);

  var chart_div=document.getElementById(div_id);

  var data;

  if(div_id=="donut_1"){
    data={a:25,b:75};
  }
  if(div_id=="donut_2"){
    data={a:50,b:50};
  }
  if(div_id=="donut_3"){
    data={a:4,b:96};
  }

  var margin = {top: 30, right: 30, bottom: 0, left: 60},
  width = chart_div.offsetWidth - margin.left - margin.right,
  height = 73 - margin.top - margin.bottom;

  var radius = 25;

  var svg = d3.select("#"+div_id)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(responsivefy)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  //colors
  var color = d3.scaleOrdinal()
  .domain(data)
  .range(['#0be881','#3c40c6'])

  var pie = d3.pie()
  .value(function(d) {console.log(d.value);return d.value; })
  var data_ready = pie(d3.entries(data));

  svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(15)       
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

  svg.append("text")
  .attr("class","donut_label")
  .attr("text-anchor","middle")
  .text(data['b']+"%");

  // svg.append("text")
  // .attr("class","donut_label")
  // .attr("x",-width/2)
  // .attr("y",0 +(margin.top+5))
  // .text("Chart_"+number);



}