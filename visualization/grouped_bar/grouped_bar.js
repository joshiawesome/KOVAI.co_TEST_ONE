function Create_GroupedBar(){

  var chart_div=document.getElementById("average_charts");

  var margin = {top: 10, right: 30, bottom: 20, left: 50},
      width = chart_div.offsetWidth - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

  var svg = d3.select("#average_charts")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(responsivefy)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // d3.csv('../../assets/data/average_charts.csv',function(data){
    // console.log(data);

    data=[
      {"group":"01","type_1":"1600","type_2":"2150"},
      {"group":"02","type_1":"1500","type_2":"2100"},
      {"group":"03","type_1":"2400","type_2":"2600"},
      {"group":"04","type_1":"2700","type_2":"2900"},
      {"group":"05","type_1":"1900","type_2":"2100"},
      {"group":"06","type_1":"2700","type_2":"2100"},
      {"group":"07","type_1":"3000","type_2":"2800"},
      {"group":"08","type_1":"2300","type_2":"2900"}
    ]

    var subgroups = ["type_1","type_2"];
    var groups = d3.map(data, function(d){return(d.group)}).keys();

    //x-axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
      .attr("class","xLine")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0));

    //y-axis
    var y = d3.scaleLinear()
      .domain([1000, 3000])
      .range([ height, 0 ]);
    svg.append("g")
      .attr("class","yLine")
      .call(make_y_gridlines()
            .tickSize(-width)
        )

    //horizontal grid lines 
    function make_y_gridlines() {
      return d3.axisLeft(y)
          .ticks(5)
    }
      
    var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.2]);

    //colors
    var color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#0be881','#3c40c6'])

    //appending the grouped bars
    svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

  // });
}