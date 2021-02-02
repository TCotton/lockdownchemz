import * as d3 from 'd3';
import zip from 'lodash.zip';
import {newColourArray,covertToArrayRemoveLastValue} from "./helperFunctions";

export const D3BuildD3Stars = {
  createElement: function () {
    this.height = 300;
    this.width = 300;

    this.svg = d3.select("#svg4")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .attr("preserveaspectratio", "MidYMid meet");

    this.g = this.svg.append("g").attr("transform", "translate(0,0)").attr('class', 'stars');
    this.gL = this.svg.append("g").attr("transform", `translate(0,0)`).attr('class', 'lines');
  },
  build: function () {
    const colours = newColourArray(data);
    let result = zip(data, colours);
    this.x = d3.scaleBand().range([0, this.width]).domain(result.map(d => d[1])).padding(0);
    this.y = d3.scaleLinear().range([this.height, 0]).domain([0, 1]);

    this.elem = this.g.selectAll('.star').data(result);

    this.elem.join('rect')
      .attr("class", "star")
      .attr('width', this.x.bandwidth)
      .attr("height", d => {
        return this.height - this.y(d[0]);
      })
      .attr('fill', '#000000')
      .attr('fill-opacity', "0.5")
      .attr('x', d => this.x(d[1]))
      .attr('y', d => this.y(d[0]));

    this.elem = this.gL.selectAll('.line').data(result);

    this.elem.join('line')
      .attr("class", "line")
      .attr('width', this.x.bandwidth)
      .attr('stroke', d => {
        return d[1];
      })
      .attr('x1', d => this.x(d[1]))
      .attr('x2', d => this.x(d[1]) + this.x.bandwidth())
      .attr('y1', d => {
        return this.y(d[0]);
      })
      .attr('y2', d => {
        return this.y(d[0]) + 1;
      });
  },
  update: function (data) {
    const colours = newColourArray(data);
    let result = zip(covertToArrayRemoveLastValue(data), colours);
    this.x = d3.scaleBand().range([0, this.width]).domain(result.map(d => d[1])).padding(0);
    this.y = d3.scaleLinear().range([this.height, 0]).domain([0, 1]);

    this.elem = this.g.selectAll('.star').data(result);
    this.elem = this.gL.selectAll('.line').data(result);

/*
    this.elem.join('rect')
      .attr("class", "star")
      .attr('width', this.x.bandwidth)
      .attr("height", d => {
        return this.height - this.y(d[0]);
      })
      .attr('fill', '#000000')
      .attr('fill-opacity', "0.5")
      .attr('x', d => this.x(d[1]))
      .attr('y', d => this.y(d[0]));
*/

    this.elem.join('line')
      .attr("class", "line")
      .attr('width', this.x.bandwidth)
      .attr('stroke', d => {
        return d[1];
      })
      .attr('stroke-width', 2)
      .attr('x1', d => this.x(d[1]))
      .attr('x2', d => this.x(d[1]) + this.x.bandwidth())
      .attr('y1', d => {
        return this.y(d[0]);
      })
      .attr('y2', d => {
        return this.y(d[0]) + 1;
      });
  }
}
