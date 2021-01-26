import * as d3 from 'd3';

export const createD3 = ({
                           height,
                           width,
                           fftSize
                         }): { d3Build(): void; circleRadius(): void; d3BuildCircle(): void; deBuildDodecahedron(): void; setFftSize(fftSize: number): AnalyserNode; fftSize: number; width: number; setHeight(height: number): number; setWidth(width: number): number; d3BuildPolygon(): void; d3BuildDodecahedron(): void; d3Path(waveformArray: Array<Float32Array>): void; height: number } => ({
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
      .attr('width', '100%');
  },
  d3BuildCircle(): void {
    const colourOne = "hsla(42, 100%, 59%, 100%)";
    const colourTwo = "hsla(41, 100%, 70%, 100%)";
    const colourThree = "hsla(42, 100%, 81%, 100%)";
    const colourFour = "hsla(45, 100%, 89%, 100%)";
    const colourFive = "hsla(174, 43%, 56%, 100%)";
    const colourSix = "hsla(0, 0%, 0%, 100%)";
    const startingColorPercentage = 100;
    const startingSizeDataPoint = 50;
    const circleRadius = d3.scaleLinear().domain([0, 1]).range([0, 150]);
    const circleYaxis = d3.scaleLinear().domain([0, 400]).range([30, 50]);
    const circleXaxis = d3.scaleLinear().domain([0, 400]).range([30, 50]);
    const height = 300;
    const width = 300;
    const objectData = {
      0: 0.7764196395874023,
      1: 0.7127610445022583,
      2: 0.6912775635719299,
      3: 0.6631971001625061,
      4: 0.6309546828269958,
      5: 0.6146671175956726,
      6: 0.5849979519844055,
      7: 0.552259624004364,
      8: 0.41224685311317444,
      9: 0.049705006182193756,
      10: 0.04744827002286911,
      11: 0.047423068434000
    };
    const arrayData = Object.values(objectData);
    const arrayChoice = arrayData.filter(x => x % 2 == 0)
    const svgCircle = d3.select("#svg2").append("svg");
    svgCircle.attr("viewBox", `0 0 ${width} ${height}`)
    svgCircle.attr("preserveaspectratio", "MidYMid meet");

    svgCircle.data(svgCircle);

    svgCircle
      .append("circle")
      .style("fill", colourOne)
      .attr("id", "circle-one")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", circleRadius);

    svgCircle
      .append("circle")
      .style("fill", colourTwo)
      .attr("id", "circle-two")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 125);

    svgCircle
      .append("circle")
      .style("fill", colourThree)
      .attr("id", "circle-three")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 100);

    svgCircle
      .append("circle")
      .style("fill", colourFour)
      .attr("id", "circle-four")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 75);

    svgCircle
      .append("circle")
      .style("fill", colourFive)
      .attr("id", "circle-five")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 50);

    svgCircle
      .append("circle")
      .style("fill", colourSix)
      .attr("id", "circle-six")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 25);
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
