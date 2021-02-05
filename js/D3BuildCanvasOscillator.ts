import {line, scaleLinear, select} from "d3";

export const D3BuildCanvasOscillator = {
  createElement: function ({fftSize}) {
    this.width = 300;
    this.height = 300;
    this.fftSize = fftSize;

    this.canvas = select("#svg5")
      .append('canvas')
      .attr('width', this.width)
      .attr('height', this.height)
      .classed('oscillator', true);

    const detachedContainer = document.createElement('custom');
    this.dataContainer = select(detachedContainer);
    this.context = this.canvas.node().getContext('2d');

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
  update: function (waveformArray) {
    const colourThree = 'hsl(44.4,36%,85.3%)';
    const colourFive = 'hsl(44.4,37%,50.7%)';

    this.context.save();
    this.context.clearRect(0, 0, this.width, this.height);
    this.d3Line.context(this.context);
    this.context.beginPath();
    this.d3Line(waveformArray);
    this.context.strokeStyle = colourThree;
    this.context.stroke();
    this.context.closePath();
    this.context.globalAlpha = 0.2;

    // Draw semi transparent circles
    for (let i = 0; i < 7; i++) {
      this.context.beginPath();
      this.context.fillStyle = colourFive;
      this.context.arc(150, 150, 10 + 20 * i, 0, Math.PI * 2, true);
      this.context.fill();
    }
    this.context.restore();
  }
}
