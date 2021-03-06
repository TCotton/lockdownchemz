import {select, scaleLinear,line} from 'd3';

export const createD3 = ({
                           height,
                           width,
                           fftSize
                         }): {
  d3Build(): void;
  setFftSize(fftSize: number): AnalyserNode;
  fftSize: number;
  width: number;
  setHeight(height: number): number;
  setWidth(width: number): number;
  d3Path(waveformArray: Array<Float32Array>): void;
  height: number
} => ({
  height,
  width,
  fftSize,
  setHeight(height): number {
    this.height = height;
    return this;
  },
  setWidth(width): number {
    this.width = width;
    return this;
  },
  setFftSize(fftSize): AnalyserNode {
    this.fftSize = fftSize;
    return this;
  },
  d3Build(): void {
    this.svg = select('#svg');
    this.svg.append('svg')
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr('class', 'waveform')
      .append('path');

    const xScale = scaleLinear()
      .range([0, width])
      .domain([0, this.fftSize / 2]);

    const yScale = scaleLinear()
      .range([height, 0])
      .domain([-1, 1]);

    this.d3Line = line()
      .x(function (d, i) {
        return xScale(i);
      })
      .y(function (d) {
        return yScale(d);
      });
  },
  d3Path(waveformArray: Array<Float32Array>): void {
    this.svg.select(".waveform")
      .select("path")
      .datum(waveformArray)
      .attr("d", this.d3Line);
  }
});
