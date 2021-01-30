import * as d3 from 'd3';
import {icosahedronSides} from "./helperFunctions";

export const D3BuildIcosahedron = {
  createElement: function () {
    const height = 500;
    const width = 500 / 0.52083333333;
    const velocity = [.010, .005];
    const t0 = Date.now();

    const projection = d3.geoOrthographic()
      .scale(height / 2 - 10);

    this.svg = d3.select("#svg3")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveaspectratio", "MidYMid meet");

    this.g = this.svg.append("g").attr("transform", "translate(0, 0)").attr('class', 'icosahedron');

    const side = this.g.selectAll('.path')
      .data(icosahedronSides)
      .join('path')
      .attr("class", "path")
      .attr('fill', 'aquamarine')
      .attr('stroke', "#000000")
      .attr('style', 'opacity:0.2')
      .attr('stroke-width', "1");

    side.attr("d", function (d) {
      return "M" + d.map(projection).join("L");
    });

    d3.timer(function () {
      const time = Date.now() - t0;
      projection.rotate([time * velocity[0], time * velocity[1]]);
      side.attr("d", function (d) {
        return "M" + d.map(projection).join("L");
      });
    });
  },
  update: function () {

  }
}
