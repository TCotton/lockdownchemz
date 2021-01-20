import * as d3 from 'd3';
export const createD3 = ({height, width, fftSize}):{ setFftSize(fftSize): AnalyserNode; fftSize: any; width: any; d3Build(): void; setHeight(height): number; setWidth(width): number; d3Path(waveformArray: Array<Float32Array>): void; height: any } => ({
  height,
  width,
  fftSize,
  setHeight(height): number  {
    this.height = height;
    return this;
  },
  setWidth(width): number  {
    this.width = width;
    return this;
  },
  setFftSize(fftSize): AnalyserNode  {
    this.fftSize = fftSize;
    return this;
  },
  d3Build(): void {
    this.svg = d3.select('#svg');
    this.svg.attr("viewBox", `0 0 ${this.width} ${this.height}`);

    const xScale = d3.scaleLinear()
      .range([0, width])
      .domain([0, this.fftSize]);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([-1, 1]);

    this.d3Line = d3.line()
      .x(function (d, i) {
        return xScale(i);
      })
      .y(function (d) {
        return yScale(d);
      });
  },
  d3Path(waveformArray:Array<Float32Array>): void {
    this.svg.select(".waveform")
      .select("path")
      .datum(waveformArray)
      .attr("d", this.d3Line);
  }
});
