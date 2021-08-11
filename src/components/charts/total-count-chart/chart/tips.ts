import { DataModel, DivisionName } from "./models";

import * as d3 from "d3";
import { number } from "yargs";

export const generateTipChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  width: number,
  height: number,
  yTip: d3.ScaleLinear<number, number, never>
): [
  d3.Selection<SVGSVGElement, unknown, null, undefined>,
  (xVal: number, yVal: number, data: DataModel) => void
] => {
  const tipSvg = svg.append("svg");
  const tipWidth = 200;

  tipSvg.attr("height", 0).attr("width", 0);

  // background
  tipSvg
    .append("rect")
    .attr("class", "tip-background")
    .attr("height", tipWidth)
    .attr("width", tipWidth)
    .attr("x", 0)
    .attr("y", 0);

  // creating pie chart
  const pie = d3.pie<number>().padAngle(0.005).sort(null);

  const radius = Math.min(tipWidth, tipWidth) / 2;

  // select color domain
  const color = d3
    .scaleOrdinal()
    .domain(["NARCD", "SARCD", "GRCD"])
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

  const arc = d3.arc();

  const pieSvg = tipSvg.append("g").append("path").attr("fill", "black");

  const tipBar = tipSvg
    .append("rect")
    .attr("class", "tip-bar")
    .attr("fill", "black")
    .attr("width", 50)
    .attr("x", 50);

  const updateData = (xVal: number, yVal: number, data: DataModel) => {
    tipSvg
      .attr("height", tipWidth)
      .attr("width", tipWidth)
      .attr("x", xVal < width / 2 ? xVal : xVal - tipWidth)
      .attr("y", yVal < height / 2 ? yVal : yVal - tipWidth);

    const divPieData = pie(data.divisions.map((d) => d.count));

    const arcs = arc({
      innerRadius: 10,
      outerRadius: radius,
      startAngle: 0,
      endAngle: Math.PI / 2,
    });

    console.log(divPieData);
    pieSvg
      .datum(divPieData)

      .selectAll("path")
      .attr("stroke", "red")
      .attr("x", 50)
      .attr("y", 50)
      .attr("d", arcs ? arcs : "");

    // pie.value(d=>)

    // tipBar
    //   .attr("height", tipWidth - yTip(data.count))
    //   .attr("y", yTip(data.count));
  };
  return [tipSvg, updateData];
};
