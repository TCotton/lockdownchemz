import {axisBottom, axisLeft, line, scaleLinear, select} from "d3";

export const D3BuildSpectrogram = {
  createElement: function ({fftSize}) {
    const margin = {top: 50, right: 0, bottom: 40, left: 40};
    this.width = 300 - margin.left - margin.right;
    this.height = 300 - margin.top - margin.bottom;
    this.fftSize = fftSize;

    const colourFive = 'hsl(44.4,37%,50.7%)';

    this.svg = select('#svg6');
    this.svg.append('svg')
      .attr("viewBox", `0 0 300 300`)
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr('class', 'spectrogram');

    const xScale = scaleLinear()
      .range([0, this.width])
      .domain([0, this.fftSize / 2]);

    const yScale = scaleLinear()
      .range([this.height, 0])
      .domain([0, 255]);

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
      .selectAll(".spectrogram")
      .append("text")
      .attr("x", (this.width / 2) - (margin.left / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("getByteFrequencyData");

    this.svg
      .selectAll(".spectrogram")
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", this.width)
      .attr("y", this.height + margin.top - 15)
      .text("Fast Fourier Transform (FFT)");

    this.svg.selectAll(".spectrogram")
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", 0)
      .text("Frequency data - 0 to 255");

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
  init: function (data) {

    this.elem = this.svg.selectAll(".spectrogram").selectAll('.path').data([data]);
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
  },
}
