_.teaser = function(str) {
  if (!str) return "";
  return str.length > 90 ? str.trim().substring(0, 89)+" ..." : str;
}

function makeASweetVoronoiTesselation(selector) {
  var w = 335,
      h = 60;

  var vertices = d3.range(20).map(function(d) {
    return [Math.random() * w, Math.random() * h];
  });

  var svg = d3.select(selector)
    .append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "BlYl")
      .on("mousemove", update);

  svg.selectAll("path")
      .data(voronoi(vertices))
    .enter("svg:path")
      .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

  svg.selectAll("circle")
      .data(vertices.slice(1))
    .enter("svg:circle")
      .attr("transform", function(d) { return "translate(" + d + ")"; })
      .attr("r", 2);

  function update() {
    vertices[0] = d3.svg.mouse(this);
    svg.selectAll("path")
        .data(voronoi(vertices)
        .map(function(d) { return "M" + d.join("L") + "Z"; }))
        .filter(function(d) { return this.getAttribute("d") != d; })
        .attr("d", function(d) { return d; });
  }
}