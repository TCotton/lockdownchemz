// @ts-ignore
import * as d3 from 'd3';

export const createD3 = ({
                           height,
                           width,
                           fftSize
                         }): { d3Build(): d3; setFftSize(fftSize): AnalyserNode; fftSize: number; width: number; setHeight(height): number; setWidth(width): number; d3Path(waveformArray: Array<Float32Array>): void; normalizeData: (frequencyArray: number[]) => number[]; height: number; aggregate: (frequencyArray: Float32Array[]) => Float32Array } => ({
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
  d3Build(): d3 {
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
  d3Path(waveformArray: Array<Float32Array>): void {
    this.svg.select(".waveform")
      .select("path")
      .datum(waveformArray)
      .attr("d", this.d3Line);
  },
  aggregate: function(frequencyArray: Float32Array[]): Float32Array {
    const numberOfBars = Array.from(Array(12).keys());
    const aggregated = new Float32Array(numberOfBars); // does this need to be Float32Array?

    numberOfBars.forEach((x, ) => {
      let lowerBound = Math.floor(x / numberOfBars.length * frequencyArray.length);
      let upperBound = Math.floor((x + 1) / numberOfBars.length * frequencyArray.length);
      let bucket = frequencyArray.slice(lowerBound, upperBound);

      aggregated[x] = bucket.reduce(function(acc, d) {
        return acc + d;
      }, 0) / bucket.length;
    });

    return aggregated;
  },

  /*
  TODO: this DOES NOT normalise data between 0 and 1
   */
  normalizeData: function(frequencyArray: number[]): number[] {
    const multiplier = Math.pow(Math.max(...frequencyArray), -1);
    return frequencyArray.map(n => n * multiplier);
  }
});
