import { select, scaleLinear, selectAll } from "d3";

export const D3BuildCircle = function () {

  D3BuildCircle.prototype.createElement = function (): void {
    const colourOne = 'hsla(199.3,66.7%,75.3%,100%)';
    const colourTwo = 'hsla(187.6,76.5%,36.7%,100%)';
    const colourThree = 'hsla(200.8,100%,18.6%,100%)';
    const colourFour = 'hsla(209.5,100%,25.9%,100%)';
    const colourFive = 'hsla(60.9,91.8%,71.2%,100%)';
    const colourSix = "hsla(45, 100%, 89%, 1)";
    const stroke = "hsla(0, 0%, 100%, 0.2)";
    const height = 300;
    const width = 300;
    this.svgCircle = select("#svg1").append("svg");
    this.svgCircle.attr("viewBox", `0 0 ${width} ${height}`)
    this.svgCircle.attr("preserveaspectratio", "MidYMid meet");
    this.svgCircle.style('opacity', "0.5");

    this.svgCircle
      .append("circle")
      .attr("fill", colourOne)
      .attr("id", "circle-one")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 0);

    this.svgCircle
      .append("circle")
      .attr("fill", colourTwo)
      .attr("stroke", stroke)
      .attr("stroke-width", 1)
      .attr("id", "circle-two")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 0);

    this.svgCircle
      .append("circle")
      .attr("fill", colourThree)
      .attr("stroke", stroke)
      .attr("stroke-width", 1)
      .attr("id", "circle-three")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 0);

    this.svgCircle
      .append("circle")
      .attr("fill", colourFour)
      .attr("stroke", stroke)
      .attr("stroke-width", 1)
      .attr("id", "circle-four")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 0);

    this.svgCircle
      .append("circle")
      .attr("fill", colourFive)
      .attr("stroke", stroke)
      .attr("stroke-width", 1)
      .attr("id", "circle-five")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 0);

    this.svgCircle
      .append("circle")
      .attr("fill", colourSix)
      .attr("stroke", '#ffffff')
      .attr("stroke-width", 1)
      .attr("id", "circle-six")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", 0);
  }

  D3BuildCircle.prototype.update = function (objectData: number[]): void {
    const arrayData = Object.values(objectData);
    const circleRadius = scaleLinear().domain([0, 1]).range([0, 150]);
    const svgCircle = selectAll('#svg1 circle');
    svgCircle.data(arrayData).enter();

    svgCircle.attr("r", function (d: number) {
      return circleRadius(d);
    });

    svgCircle.attr("fill", function (d: number, i) {
      const opacity = (d * 100);
      switch (i) {
        case 0:
          return `hsla(199.3,66.7%,75.3%, ${opacity})`;
        case 1:
          return `hsla(187.6,76.5%,36.7%, ${opacity})`;
        case 2:
          return `hsla(200.8,100%,18.6%, ${opacity})`;
        case 3:
          return `hsla(209.5,100%,25.9%, ${opacity})`;
        case 4:
          return `hsla(60.9,91.8%,71.2%, ${opacity})`;
        case 5:
          return `hsla(0, 0%, 100%, ${opacity})`;
      }
    });
  }
}
