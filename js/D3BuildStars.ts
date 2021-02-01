import * as d3 from 'd3';

export const D3BuildD3Stars = {
  createElement: function() {
    const height = 300;
    const width = 300;

    const colourOne = 'hsla(199.3,66.7%,75.3%,100%)';
    const colourTwo = 'hsla(187.6,76.5%,36.7%,100%)';
    const colourThree = 'hsla(200.8,100%,18.6%,100%)';
    const colourFour = 'hsla(209.5,100%,25.9%,100%)';
    const colourFive = 'hsla(60.9,91.8%,71.2%,100%)';

    this.svg = d3.select("#svg3")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveaspectratio", "MidYMid meet");

  },
  update: function() {

  }
}
