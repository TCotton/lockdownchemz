import {select} from "d3";

export const D3BuildSpectrogramCanvas = {
  createElement: function ({fftSize}) {
    this.width = 300;
    this.height = 300;
    this.fftSize = fftSize;

    this.canvas = select("#svg7")
      .append('canvas')
      .attr('width', this.width)
      .attr('height', this.height)
      .classed('spectrogram', true);

    const detachedContainer = document.createElement('custom');
    this.dataContainer = select(detachedContainer);
    this.context = this.canvas.node().getContext('2d');
    this.context.fillStyle = 'hsl(44.4,37%,50.7%)';
    this.context.clearRect(0, 0, this.width, this.height);
  },
  init: function (DATA) {
    const LEN = DATA.length;
    const h = this.height / LEN;
    const x = this.width - 1;

    let imgData = this.context.getImageData(1, 0, this.width - 1, this.height);
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.putImageData(imgData, 0, 0);
    for (let i = 0; i < LEN; i++) {
      let rat = DATA[i] / 255;
      let hue = Math.round((rat * 120) + 280 % 360);
      let sat = '36%';
      let lit = 10 + (70 * rat) + '%';
      this.context.beginPath();
      this.context.strokeStyle = `hsl(${hue}, ${sat}, ${lit})`;
      this.context.moveTo(x, this.height - (i * h));
      this.context.lineTo(x, this.height - (i * h + h));
      this.context.stroke();
    }
  },
}
