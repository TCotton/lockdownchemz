import {line, scaleLinear, select} from "d3";

export const D3Test = {
  createElement: function({fftSize}) {
    this.width = 300;
    this.height = 300;
    this.fftSize = fftSize;
    this.svg = select('#svg5');
    this.svg.append('svg')
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr('class', 'oscillator');

    const xScale = scaleLinear()
      .range([0, this.width])
      .domain([0, this.fftSize / 2]);

    const yScale = scaleLinear()
      .range([this.height, 0])
      .domain([-1, 1]);

    this.d3Line = line()
      .x(function (d, i) {
        return xScale(i);
      })
      .y(function (d) {
        return yScale(d);
      });
  },
  update: function(waveformArray) {
    const result = [waveformArray];
    this.elem = this.svg.selectAll(".oscillator").selectAll('.path').data(result);

    this.elem.join(
      enter => {
        enter
          .append("path")
          .attr('class', 'path')
          .attr("d", this.d3Line)
          .attr('fill', 'transparent')
          .attr('stroke', '#ffffff');
      },
      update => {
        update.attr("d", this.d3Line);
      }
    );
  }
}
