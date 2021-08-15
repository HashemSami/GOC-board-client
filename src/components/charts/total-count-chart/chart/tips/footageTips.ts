import { DataModel, DaysDataModel } from "../models";
import { bandScale, linearScale } from "../../../../../services/d3";

import * as d3 from "d3";
import { number } from "yargs";

export const generateFootageTipChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  width: number,
  height: number
): [
  d3.Selection<SVGSVGElement, unknown, null, undefined>,
  (xVal: number, yVal: number, data: DataModel | DaysDataModel) => void
] => {
  const margin = { top: 50, bottom: 10, left: 10, right: 10 };
  const tipWidth = 250;
  const tipHight = 200;

  const heads = ["Count", "TGF", "TRF"];

  const divs: ["NARCD", "SARCD", "GRCD"] = ["NARCD", "SARCD", "GRCD"];

  const chartOptions = {
    chartHeight: tipHight - margin.top - margin.bottom,
    chartWidth: tipWidth - margin.left - margin.right,
  };

  const { chartWidth, chartHeight } = chartOptions;

  const x = bandScale(heads, [0, chartWidth]);

  x.padding(0.5);

  const midPoint = x.bandwidth() / 2;

  const xKpi = linearScale([0, 100], [0, chartWidth]);

  const tipSvg = svg.append("svg");

  tipSvg.attr("height", 0).attr("width", 0);

  // background
  tipSvg
    .append("rect")
    .attr("class", "tip-background")
    .attr("height", tipHight)
    .attr("width", tipWidth)
    .attr("x", 0)
    .attr("y", 0)
    .attr("style", "fill:rgba(10,10,10,0.8); stroke:yellow; stroke-width:5;");

  // chart Area
  const tipChart = tipSvg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // select color domain
  const color = d3
    .scaleOrdinal<string>()
    .domain(divs)
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

  const tipTitle = tipChart
    .append("text")
    .attr("x", chartWidth / 2)
    .attr("y", -(margin.top / 2))
    .attr("fill", "white")
    .attr("text-anchor", "middle");

  const tipText = generateTipText(tipChart, heads);

  // kpi components
  const xVal = xKpi(100);

  const kpiText = tipChart
    .append("text")
    .attr("x", 5)
    .attr("y", 15)
    .attr("fill", `white`);
  // .attr("style", "font-size:0.7em")

  // percentage rect
  tipChart
    .append("rect")
    .attr("x", 0)
    .attr("y", 20)
    .attr("width", xVal)
    .attr("height", 15)
    .attr("fill", "darkgray");

  const kpiRect = tipChart
    .append("rect")
    .attr("x", 0)
    .attr("y", 20)
    .attr("height", 15)
    .attr("stroke", "white")
    .attr("fill", "red");

  const updateData = (
    xVal: number,
    yVal: number,
    data: DataModel | DaysDataModel
  ) => {
    tipSvg
      .attr("x", xVal < width / 2 ? xVal : xVal - tipWidth)
      .attr("y", yVal < height / 2 ? yVal : yVal - tipHight)
      // .style("opacity", 0)
      .transition()
      .duration(80)
      .attr("width", tipWidth)
      .attr("height", tipHight);
    // .style("opacity", 1);

    tipTitle.text(data.monthName);
    heads.forEach((d, i) => {
      const xVal = chartWidth / 2;
      const yVal = chartHeight / 4 + 30 * (i + 1);

      const text = tipText[d].text;

      const textData: string =
        d === "Count"
          ? `Count: ${data.count}`
          : d === "TGF"
          ? ` TGF: ${data.tgf}`
          : d === "TRF"
          ? `TRf: ${data.trf}`
          : "";

      text
        .attr("y", yVal)
        .attr("x", xVal ? xVal : 0)
        .text(textData);
    });
    kpiText.text(`KPI: ${data.kpi} %`);
    kpiRect.attr("width", xKpi(data.kpi));
  };
  return [tipSvg, updateData];
};

const generateTipText = (
  tipChart: d3.Selection<SVGGElement, unknown, null, undefined>,
  heads: string[]
) => {
  const textObj: {
    [div: string]: {
      text: d3.Selection<SVGTextElement, unknown, null, undefined>;
    };
  } = {};

  const divsGroup = tipChart.append("g");

  heads.forEach((d, i) => {
    const divPath = divsGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("class", `${d} text`)
      .attr("fill", `white`);
    Object.assign(textObj, { [d]: { text: divPath } });
  });

  return textObj;
};
