import { DataModel, DivisionName } from "../models";

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
  const margin = { top: 10, bottom: 10, left: 10, right: 10 };
  const tipWidth = 400;
  const tipHight = 250;

  const divs: ["NARCD", "SARCD", "GRCD"] = ["NARCD", "SARCD", "GRCD"];

  const chartOptions = {
    chartHeight: tipHight - margin.top - margin.bottom,
    chartWidth: tipWidth - margin.left - margin.right,
  };

  const { chartWidth, chartHeight } = chartOptions;

  const tipSvg = svg.append("svg");

  tipSvg.attr("height", 0).attr("width", 0);

  // background
  tipSvg
    .append("rect")
    .attr("class", "tip-background")
    .attr("height", tipHight)
    .attr("width", tipWidth)
    .attr("x", 0)
    .attr("y", 0);

  const tipChart = tipSvg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // creating pie chart
  const pie = d3
    .pie<
      | { name: "NARCD"; count: number }
      | { name: "SARCD"; count: number }
      | { name: "GRCD"; count: number }
    >()
    .padAngle(0.05)
    .sort(null)
    .value(d => d.count);

  const radius = Math.min(120, 120) / 2;

  // select color domain
  const color = d3
    .scaleOrdinal<string>()
    .domain(divs)
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

  const arc = d3.arc();

  const pieSvg = genrateArcs(tipChart, divs, chartWidth, chartHeight);
  console.log(pieSvg);

  const tipBar = tipChart
    .append("rect")
    .attr("class", "tip-bar")
    .attr("fill", "black")
    .attr("width", 50)
    .attr("x", 50);

  const updateData = (xVal: number, yVal: number, data: DataModel) => {
    tipSvg
      .attr("width", tipWidth)
      .attr("height", tipHight)
      .attr("x", xVal < width / 2 ? xVal : xVal - tipWidth)
      .attr("y", yVal < height / 2 ? yVal : yVal - tipHight);

    const divPieData = pie([]);

    // const arcs = arc({
    //   innerRadius: 10,
    //   outerRadius: radius,
    //   startAngle: 0,
    //   endAngle: Math.PI / 2,
    // });

    divPieData.forEach(d => {
      const { endAngle, padAngle, startAngle, data } = d;
      const arcs = arc({
        innerRadius: 50,
        outerRadius: radius,
        startAngle: startAngle,
        endAngle: endAngle,
        padAngle,
      });

      const divPath = pieSvg[data.name].path;

      divPath
        .attr("stroke", "red")
        .attr("fill", "red")
        // .attr("class", `val${data}`)
        .attr("fill", color(data.name))
        .attr("d", arcs ? arcs : "");
    });

    // tipBar
    //   .attr("height", chartHeight - yTip(data.count))
    //   .attr("y", yTip(data.count));
  };
  return [tipSvg, updateData];
};

const genrateArcs = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  divs: ["NARCD", "SARCD", "GRCD"],
  chartWidth: number,
  chartHeight: number
): {
  [div: string]: {
    path: d3.Selection<SVGPathElement, unknown, null, undefined>;
  };
} => {
  const arecObj: {
    [div: string]: {
      path: d3.Selection<SVGPathElement, unknown, null, undefined>;
    };
  } = {};

  const divsGroup = svg.append("g");

  divs.forEach((d, i) => {
    const divPath = divsGroup
      .append("path")
      .attr("class", `${d}`)
      .attr(
        "transform",
        "translate(" + chartWidth / 6 + "," + chartHeight / 2 + ")"
      );
    Object.assign(arecObj, { [d]: { path: divPath } });
  });

  return arecObj;
};
