import * as d3 from 'd3';
import {axisBottom, axisLeft, line, scaleLinear, select} from "d3";

export const D3BuildWaveline = {

  createElement: function ({fftSize}) {
    const margin = {top: 50, right: 0, bottom: 40, left: 40};
    this.width = 300 - margin.left - margin.right;
    this.height = 300 - margin.top - margin.bottom;
    this.fftSize = fftSize;

    const colourFive = 'hsl(44.4,37%,50.7%)';

    this.svg = select('#svg8');
    this.svg.append('svg')
      .attr("viewBox", `0 0 300 300`)
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr('class', 'waveform');

    const xScale = scaleLinear()
      .range([0, this.width])
      .domain([0, this.fftSize]);

    const yScale = scaleLinear()
      .range([this.height, 0])
      .domain([-1, 1]);

    const ab = axisBottom(xScale).ticks(8);
    const al = axisLeft(yScale);

    this.svg
      .select('svg')
      .append('g')
      .attr('transform', "translate(" + margin.left + "," + (this.width) + ")")
      .attr('class', "bottom-ticks")
      .call(ab)
      .selectAll("text")
      .attr("transform", "translate(-10,0) rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", 10)
      .style("fill", colourFive);

    this.svg
      .selectAll(".waveform")
      .append("text")
      .attr("x", (this.width / 2) - (margin.left / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("getFloatTimeDomainData");

    this.svg
      .selectAll(".waveform")
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", this.width)
      .attr("y", this.height + margin.top - 15)
      .text("Fast Fourier Transform (FFT)");

    this.svg.selectAll(".waveform")
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", 0)
      .text("Frequency data - -1 to +1");

    this.svg
      .select('svg')
      .append('g')
      .attr('transform', "translate(" + margin.left + "," + margin.top + ")")
      .attr('class', "left-ticks")
      .call(al);

    this.d3Line = line()
      .x(function (d, i) {
        return xScale(i);
      })
      .y(function (d) {
        // @ts-ignore
        return yScale(d);
      });
  },
  update: function (data) {

    this.elem = this.svg.selectAll(".waveform").selectAll('.path').data([data]);
    const colourThree = 'hsl(44.4,36%,85.3%)';

    this.elem.join(
      enter => {
        enter
          .append("path")
          .attr('class', 'path')
          .attr("d", this.d3Line)
          .attr('fill', 'transparent')
          .attr('stroke', colourThree);
      },
      update => {
        update
          .attr("d", this.d3Line)
      }
    );

  }
}
