function Create_Map(){

  var chart_div=document.getElementById("maps");

  var margin = {top: 10, right: 30, bottom: 20, left: 50},
      width = chart_div.offsetWidth - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

  var svg = d3.select("#maps")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(responsivefy)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  var projection = d3.geoNaturalEarth1()
  .scale(width / 1.3 / Math.PI)
  .translate([width / 2, height / 2]);

  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){

      // Draw the map
      svg.append("g")
          .selectAll("path")
          .data(data.features)
          .enter().append("path")
              .attr("fill", "#84817a")
              .attr("d", d3.geoPath()
                  .projection(projection)
              )
              .style("stroke", "#fff")
  });
}

