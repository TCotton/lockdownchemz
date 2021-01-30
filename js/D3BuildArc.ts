import {arc, select} from 'd3';
import {createArcArray} from './helperFunctions';

export const D3BuildArc = function () {

  D3BuildArc.prototype.createElement = function (): void {
    const height = 300;
    const width = 300;

    this.svg = select("#svg2")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveaspectratio", "MidYMid meet");

    this.svg.append("g").attr("transform", "translate(150, 150)").attr('class', 'arc');

    this.arc = arc().innerRadius(function (d) {
      return d[2];
    }).outerRadius(function (d) {
      return d[3];
    }).startAngle(0)
      .endAngle(function (d) {
        let degrees = (d[0] / 1 * 100) / 100 * 360.0;
        let radians = degrees * (Math.PI / 180);
        return radians;
      });
  }

  D3BuildArc.prototype.update = function (data: number[]): void {
    const result = createArcArray(data);
    const d3Arc = select('#svg2 svg').selectAll("g").selectAll('.path').data(result);

    d3Arc.enter()
      .append('path')
      .merge(d3Arc)
      .attr("class", "path")
      .attr('d', this.arc)
      .attr('fill', function (d: object) {
        return d[1];
      });

    d3Arc.exit().remove();
  }
}
