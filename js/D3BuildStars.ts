import * as d3 from 'd3';
import zip from 'lodash.zip';
import {newColourArray} from "./helperFunctions";

export const D3BuildD3Stars = {
  createElement: function () {
    this.height = 300;
    this.width = 300;
    const data = [0.1, 0.2, 0.3, 0.9, 1];
    const colours = newColourArray(data);
    const result = zip(data, colours);

    this.svg = d3.select("#svg4")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .attr("preserveaspectratio", "MidYMid meet");

    this.g = this.svg.append("g").attr("transform", "translate(0,0)").attr('class', 'stars');

    this.x = d3.scaleBand().range([0, this.width]).domain(result.map(d => d[1])).padding(0);
    this.y = d3.scaleLinear().range([this.height, 0]).domain([0, 1]);

    this.elem = this.g.selectAll('.star').data(result);

    this.elem.join('rect').attr("class", "star")
      .attr('width', this.x.bandwidth)
      .attr("height", d => {
        return this.height - this.y(d[0]) - 1;
      })
      .attr('fill', () => {
        return `#ffffff`;
      })
      .attr('style', (d) =>{
        return `border-top: 1px solid ${d[1]}; opacity: 0.5`;
      })
      .attr('x', d => this.x(d[1]))
      .attr('y', d => this.y(d[0]));

  },
  update: function () {

  }
}
