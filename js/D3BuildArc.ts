import * as d3 from 'd3';

export const D3BuildArc = function () {

  D3BuildArc.prototype.createElement = function (): void {
    const height = 300;
    const width = 300;
    this.radiusOne = Math.min(width, height) / 2;
    this.donutWidthOne = (this.radiusOne - (this.radiusOne / 6));
    const radiusTwo = this.donutWidthOne;
    const donutWidthTwo = (radiusTwo - (this.radiusOne / 6));
    const radiusThree = donutWidthTwo;
    const donutWidthThree = (radiusThree - (this.radiusOne / 6));
    const radiusFour = donutWidthThree;
    const donutWidthFour = (radiusFour - (this.radiusOne / 6));
    const radiusFive = donutWidthFour;
    const donutWidthFive = (radiusFive - (this.radiusOne / 6));

    const svgCircle = d3.select("#svg2").append("svg");
    svgCircle.attr("viewBox", `0 0 ${width} ${height}`);
    svgCircle.attr("preserveaspectratio", "MidYMid meet");

    const colourOne = 'hsla(199, 67%, 75%, 100%)';
    const colourTwo = 'hsla(188, 76%, 37%, 100%)';
    const colourThree = 'hsla(201, 100%, 19%, 100%)';
    const colourFour = 'hsla(210, 100%, 26%, 100%)';
    const colourFive = 'hsla(61, 92%, 71%, 100%)';

    const data = [0.8095791339874268, 0.7726434469223022, 0.697538435459137, 0.6523454785346985, 0.2050601691007614, 0.06988223642110825];
    console.log(data[0]);

    svgCircle.append("path")
      .attr("d", this.buildArc(this.donutWidthOne, this.radiusOne))
      .attr('fill', colourOne)
      .attr('id', 'colourOne')
      .attr("transform", "translate(150, 150)");

    svgCircle.append("path")
      .attr("d", this.buildArc(donutWidthTwo, radiusTwo))
      .attr('fill', colourTwo)
      .attr('id', 'colourTwo')
      .attr("transform", "translate(150, 150)");

    svgCircle.append("path")
      .attr("d", this.buildArc(donutWidthThree, radiusThree))
      .attr('fill', colourThree)
      .attr('id', 'colourThree')
      .attr("transform", "translate(150, 150)");

    svgCircle.append("path")
      .attr("d", this.buildArc(donutWidthFour, radiusFour))
      .attr('fill', colourFour)
      .attr('id', 'colourFour')
      .attr("transform", "translate(150, 150)");

    svgCircle.append("path")
      .attr("d", this.buildArc(donutWidthFive, radiusFive))
      .attr('fill', colourFive)
      .attr('id', 'colourFive')
      .attr("transform", "translate(150, 150)");

    /*  const svg = d3.select('#svg2').selectAll('path');
      svg.data(data_ready).enter();
      svg.attr("d", arc);
      svg.attr('fill', '#ffffff');*/
  }

  D3BuildArc.prototype.buildArc = function (donutWidth: number, radius: number, startAngle: number = 0 * (Math.PI / 180), endAngle: number = 2 * Math.PI): Arc<any, DefaultArcObject> {
    return d3.arc()
      .innerRadius(donutWidth)
      .outerRadius(radius)
      .startAngle(startAngle)
      .endAngle(endAngle);
  }

  D3BuildArc.prototype.update = function (data: number[]):void {
    const svg = d3.select('#svg2').selectAll('path');
    svg.data(data).enter();
    svg.attr('d', function(d:number, i:number) {
      switch (i) {
        case 0:
         return D3BuildArc.buildArc(this.donutWidthOne, this.radiusOne, 0, d);
        case 1:

        case 2:

        case 3:

        case 4:

        case 5:
          return `hsla(0, 0%, 100%, ${opacity})`;
      }
    });
  }

}
