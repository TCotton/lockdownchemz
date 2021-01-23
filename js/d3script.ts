import * as d3 from 'd3';

export const createD3 = ({
                           height,
                           width,
                           fftSize
                         }): { d3Build(): void; deBuildDodecahedron():void; setFftSize(fftSize: number): AnalyserNode; fftSize: number; width: number; setHeight(height:number): number; setWidth(width:number): number; d3BuildPolygon(): void; d3BuildDodecahedron(): void; d3Path(waveformArray: Array<Float32Array>): void; height: number } => ({
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
  d3BuildDodecahedron(): void {
    const height = 300;
    const width = 300;
    const svg = d3.select('#svg2');
    svg.append('svg')
    .attr("viewBox", `0 0 ${width} ${height}`)

    .append('rect')
    .attr('height', '100%')
    .attr('width', '100%')

  },
  d3BuildSpiral(): void {
    const height = 300;
    const width = 300;
    this.svgSpiral = d3.select('#svg2');
    this.svgSpiral.append('svg')
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveaspectratio", "MidYMid meet")

    const dL = d3.scaleLinear()
    .domain([1, 12 + 1])
    .range([0, 2 * Math.PI]);
    //.hsla(120,60%,70%,0.3);

    return dL;

    //xMidYMid meet
  },
  d3BuildPolygon(): void {
    const height = 300;
    const width = 300;

    this.svgPolygon = d3.select('#svg2');
    this.svgSpiral.append('svg')
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveaspectratio", "MidYMid meet");

    const length = (3 + ((Date.now() / 1500) % 8)) | 0;
    const polygon = d3
        .lineRadial()
        .angle((_, i) => (i / length) * 2 * Math.PI)
        .curve(d3.curveLinearClosed)
        .radius(() => 150);

        // this is incorrect data

    return polygon({length});

  },
  d3Build(): void {
    this.svg = d3.select('#svg');
    this.svg.append('svg')
    .attr("viewBox", `0 0 ${this.width} ${this.height}`)
    .append('g')
    .attr('class', 'waveform')
    .append('path');

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
  d3Path(waveformArray: Array<Float32Array>): void {
    this.svg.select(".waveform")
      .select("path")
      .datum(waveformArray)
      .attr("d", this.d3Line);
  }
});
