import { select, scaleLinear, selectAll } from "d3";

export const D3BuildCircle = function () {

  D3BuildCircle.prototype.createElement = function (): void {

    const colourOne = 'hsl(35.5,65.3%,46.3%)';
    const colourTwo = 'hsl(22.5,14.3%,11%)';
    const colourThree = 'hsl(44.4,36%,85.3%)';
    const colourFour = 'hsl(27.8,59.3%,22.2%)';
    const colourFive = 'hsl(44.4,37%,50.7%)';
    const colourSix = "hsla(45, 100%, 89%, 1)";

    const stroke = "#ffffff";
    const height = 300;
    const width = 300;
    this.svgCircle = select("#svg1").append("svg");
    this.svgCircle.attr("viewBox", `0 0 ${width} ${height}`)
    this.svgCircle.attr("preserveaspectratio", "MidYMid meet");
    this.svgCircle.style('opacity', "0.6");

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
          return `hsla(35.5,65.3%,46.3%, ${opacity})`;
        case 1:
          return `hsla(22.5,14.3%,11%, ${opacity})`;
        case 2:
          return `hsla(44.4,36%,85.3%, ${opacity})`;
        case 3:
          return `hsla(27.8,59.3%,22.2%, ${opacity})`;
        case 4:
          return `hsla(44.4,37%,50.7% ${opacity})`;
        case 5:
          return `hsla(0, 0%, 100%, ${opacity})`;
      }
    });
  }
}
