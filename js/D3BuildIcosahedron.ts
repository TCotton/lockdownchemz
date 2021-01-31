import * as d3 from 'd3';
import {icosahedronSides} from "./helperFunctions";

export const D3BuildIcosahedron = {
  createElement: function () {
    const height = 500;
    const width = 800;
    this.velocity = [.010, .005];
    this.t0 = Date.now();

    const colourOne = 'hsla(199.3,66.7%,75.3%,100%)';
    const colourTwo = 'hsla(187.6,76.5%,36.7%,100%)';
    const colourThree = 'hsla(200.8,100%,18.6%,100%)';
    const colourFour = 'hsla(209.5,100%,25.9%,100%)';
    const colourFive = 'hsla(60.9,91.8%,71.2%,100%)';
    this.arrayOfColours = [colourOne, colourTwo, colourThree, colourFour, colourFive];

    this.projection = d3.geoOrthographic()
      .scale(height / 2 - 10);

    this.svg = d3.select("#svg3")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveaspectratio", "MidYMid meet");

    this.g = this.svg.append("g").attr("transform", "translate(0, 0)").attr('class', 'icosahedron');

    this.side = this.g.selectAll('.path')
      .data(icosahedronSides)
      .join('path')
      .attr("class", "path")
      .attr('fill', function () {
        return this.arrayOfColours[Math.floor(Math.random() * this.arrayOfColours.length)]
      }.bind(this))
      .attr('stroke', "#ffffff")
      .attr('style', function () {
        return `opacity: 0.4`;
      }.bind(this))
      .attr('stroke-width', "1");

    this.side.attr("d", function (d) {
      return "M" + d.map(this.projection).join("L");
    }.bind(this));

  },
  update: function () {
    const time = Date.now() - this.t0;

    this.projection.rotate([time * this.velocity[0], time * this.velocity[1]]);
    this.side.attr("d", function (d) {
      return "M" + d.map(this.projection).join("L");
    }.bind(this));
  }
}
