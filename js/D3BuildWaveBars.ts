import {select} from "d3";

export const D3BuildWaveBars = {
  createElement: function ({fftSize}) {
    this.width = 300;
    this.height = 300;
    this.fftSize = fftSize;
    this.t0 = Date.now();

    this.canvas = select("#svg9")
      .append('canvas')
      .attr('width', this.width)
      .attr('height', this.height)
      .classed('waveforms', true);

    const detachedContainer = document.createElement('custom');
    this.dataContainer = select(detachedContainer);
    this.context = this.canvas.node().getContext('2d');
    this.rotate1 = 0;
    this.rotate2 = 180;
  },
  update: function (waveformArray, waveArrayTwo) {
    this.rotate1 += 1;
    this.rotate2 += 1;

    document.documentElement.style.setProperty("--rotateOne", `${this.rotate1}deg`);
    document.documentElement.style.setProperty("--rotateTwo", `${this.rotate2}deg`);

    this.context.save();
    this.context.fillStyle = 'hsla(44.4,36%,85.3%,10%)';
    this.context.clearRect(0, 0, 300, 300);

    let circle = new Path2D();
    circle.arc(150, 150, 150, 0, 2 * Math.PI);
    this.context.fill(circle);

    this.context.fillStyle = 'hsla(27.8,59.3%,22.2%,25%)';
    circle = new Path2D();
    circle.arc(150, 150, 130, 0, 2 * Math.PI);
    this.context.fill(circle);

    this.context.fillStyle = 'hsla(22.5,14.3%,11%,50%)';
    circle = new Path2D();
    circle.arc(150, 150, 110, 0, 2 * Math.PI);
    this.context.fill(circle);

    this.context.lineWidth = 10;
    this.context.strokeStyle = 'hsl(27.8,59.3%,22.2%)';
    this.context.beginPath();

    let sliceWidth = 300 * 1.0 / waveArrayTwo.length;
    let x = 0;

    for (let i = 0; i < waveArrayTwo.length; i++) {
      let v = waveArrayTwo[i] * 200.0;
      let y = 300 / 2 + v;

      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.context.lineTo(this.context, this.context / 2);
    this.context.stroke();

    this.context.lineWidth = 6;
    this.context.strokeStyle = 'hsla(44.4,36%,85.3%,100%)';
    this.context.beginPath();

    x = 0;

    for (let i = 0; i < waveArrayTwo.length; i++) {
      let v = waveArrayTwo[i] * 200.0;
      let y = 300 / 2 + v;

      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.context.stroke();

    this.context.lineTo(this.context, this.context / 2);
    this.context.stroke();

    this.context.lineWidth = 2;
    this.context.strokeStyle = 'hsla(27.8,59.3%,22.2%,100%)';
    this.context.beginPath();

    x = 0;

    for (let i = 0; i < waveArrayTwo.length; i++) {
      let v = waveArrayTwo[i] * 200.0;
      let y = 300 / 2 + v;

      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.context.stroke();

    this.context.lineWidth = 6;
    this.context.strokeStyle = 'hsla(22.5,14.3%,11%,50%)';
    this.context.beginPath();

    sliceWidth = 300 * 1.0 / waveformArray.length;
    x = 0;

    for (let i = 0; i < waveformArray.length; i++) {
      let v = waveformArray[i] * 200.0;
      let y = 300 / 2 + v;

      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.context.lineTo(this.context, this.context / 2);
    this.context.stroke();

    this.context.lineWidth = 2;
    this.context.strokeStyle = 'hsla(44.4,36%,85.3%,50%)';
    this.context.beginPath();

    x = 0;

    for (let i = 0; i < waveformArray.length; i++) {
      let v = waveformArray[i] * 200.0;
      let y = 300 / 2 + v;

      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.context.stroke();

    this.context.lineTo(this.context, this.context / 2);
    this.context.stroke();

    this.context.lineWidth = 1;
    this.context.strokeStyle = 'hsla(27.8,59.3%,22.2%,50%)';
    this.context.beginPath();

    x = 0;

    for (let i = 0; i < waveformArray.length; i++) {
      let v = waveformArray[i] * 200.0;
      let y = 300 / 2 + v;

      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.context.stroke();
    this.context.restore();
  }
}
