import {geoOrthographic, select} from 'd3';
import {icosahedronSides} from "./helperFunctions";
// 245 / 80
export const D3BuildIcosahedron = {
  createElement: function () {
    const height = 500;
    const width = 800;
    this.velocity = [.010, .005];
    this.t0 = Date.now();

    const colourOne = 'hsl(35.5,65.3%,46.3%)';
  const colourTwo = 'hsl(22.5,14.3%,11%)';
  const colourThree = 'hsl(44.4,36%,85.3%)';
  const colourFour = 'hsl(27.8,59.3%,22.2%)';
  const colourFive = 'hsl(44.4,37%,50.7%)';
    this.arrayOfColours = [colourOne, colourTwo, colourThree, colourFour, colourFive];

    this.projection = geoOrthographic()
      .scale(height / 2 - 10);

    this.svg = select("#svg3")
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
