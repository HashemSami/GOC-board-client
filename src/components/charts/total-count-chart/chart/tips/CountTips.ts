import { DataModel, DaysDataModel } from "../models";
import { bandScale, linearScale } from "../../../../../services/d3";
import { divsColor } from "../../../../../styles/colors";

import * as d3 from "d3";
import { number } from "yargs";

export const generateCountTipChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  width: number,
  height: number
): [
  d3.Selection<SVGSVGElement, unknown, null, undefined>,
  (xVal: number, yVal: number, data: DataModel | DaysDataModel) => void
] => {
  // setting margins
  const margin = { top: 35, bottom: 10, left: 10, right: 10 };
  const tipWidth = 500;
  const tipHight = 200;

  const chartOptions = {
    chartHeight: tipHight - margin.top - margin.bottom,
    chartWidth: tipWidth - margin.left - margin.right,
  };

  const { chartWidth, chartHeight } = chartOptions;

  // setting spaces
  const heads: ["Division", "Count", "TGF", "TRF", "KPI"] = [
    "Division",
    "Count",
    "TGF",
    "TRF",
    "KPI",
  ];

  const divs: ["NARCD", "SARCD", "GRCD"] = ["NARCD", "SARCD", "GRCD"];

  const x = bandScale(heads, [0, chartWidth]);

  x.padding(0.5);

  const midPoint = x.bandwidth() / 2;

  const xHead = x("Division");
  const xCount = x("Count");
  const xTgf = x("TGF");
  const xTrf = x("TRF");
  const xKpi = x("KPI");

  // adding the svg
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
    .attr("style", "font-size:0.8em")
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

  const tipText = generateTipText(tipChart, divs);

  // kpi components
  // const xVal = xKpi(100);

  const narcdRect = tipChart
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 10)
    .attr("stroke", "white")
    .attr("fill", divsColor.narcd);

  const sarcdRect = tipChart
    .append("rect")
    // .attr("x", 0)
    .attr("y", 0)
    .attr("height", 10)
    .attr("stroke", "white")
    .attr("fill", divsColor.sarcd);

  const grcdRect = tipChart
    .append("rect")
    // .attr("x", 0)
    .attr("y", 0)
    .attr("height", 10)
    .attr("stroke", "white")
    .attr("fill", divsColor.grcd);

  const headRowText = generateHeadRowText(tipChart, heads);

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

    const xCountChart = linearScale([0, data.count], [0, chartWidth]);

    const forDays = !!(data as DaysDataModel).dayNumber;

    const title = forDays
      ? `${data.monthName} ${(data as DaysDataModel).dayNumber}`
      : data.monthName;

    tipTitle.text(title);

    heads.forEach(d => {
      const xValH = x(d);

      const gocData = {
        Division: "GOC",
        Count: `${data.count} wells`,
        TGF: `${data.tgf} ft`,
        TRF: `${data.trf} ft`,
        KPI: `${data.kpi} %`,
      };

      headRowText[d].headRowText
        .attr("x", xValH ? xValH : 0)
        .text(d)
        .attr("y", chartHeight / 4);

      headRowText[d].gocText
        .attr("x", xValH ? xValH : 0)
        .text(gocData[d])
        .attr("y", chartHeight / 4 + 27);
    });

    divs.forEach((d, i) => {
      const yVal = chartHeight / 4 + 27 * (i + 2);

      const text = tipText[d];

      text.headRect
        .attr(
          "fill",
          d === "NARCD"
            ? divsColor.narcd
            : d === "SARCD"
            ? divsColor.sarcd
            : d === "GRCD"
            ? divsColor.grcd
            : "red"
        )
        .attr("y", yVal - 15);

      text.headText
        .attr("x", xHead ? xHead : 0)
        .text(d)
        .attr("y", yVal);

      text.countText
        .attr("x", xCount ? xCount : 0)
        .text(`${data.divisions[d].count} wells`)
        .attr("y", yVal);

      text.tgfText
        .attr("x", xTgf ? xTgf : 0)
        .text(`${data.divisions[d].tgf} ft`)
        .attr("y", yVal);

      text.trfText
        .attr("x", xTrf ? xTrf : 0)
        .text(`${data.divisions[d].trf} ft`)
        .attr("y", yVal);

      text.kpiText
        .attr("x", xKpi ? xKpi : 0)
        .text(`${data.divisions[d].kpi} %`)
        .attr("y", yVal);
    });

    // kpiRect.attr("width", xKpi(data.kpi));
    const narcdVal = xCountChart(data.divisions.NARCD.count);
    const sarcdVal = xCountChart(data.divisions.SARCD.count);
    const grcdVal = xCountChart(data.divisions.GRCD.count);
    narcdRect.attr("width", narcdVal);
    sarcdRect.attr("width", sarcdVal).attr("x", narcdVal);
    grcdRect.attr("width", grcdVal).attr("x", narcdVal + sarcdVal);
  };
  return [tipSvg, updateData];
};

const generateTipText = (
  tipChart: d3.Selection<SVGGElement, unknown, null, undefined>,
  divs: string[]
) => {
  const textObj: {
    [div: string]: {
      headRect: d3.Selection<SVGRectElement, unknown, null, undefined>;
      headText: d3.Selection<SVGTextElement, unknown, null, undefined>;
      countText: d3.Selection<SVGTextElement, unknown, null, undefined>;
      tgfText: d3.Selection<SVGTextElement, unknown, null, undefined>;
      trfText: d3.Selection<SVGTextElement, unknown, null, undefined>;
      kpiText: d3.Selection<SVGTextElement, unknown, null, undefined>;
    };
  } = {};

  const divsGroup = tipChart.append("g").attr("fill", `white`);

  divs.forEach((d, i) => {
    const headRect = divsGroup
      .append("rect")
      .attr("height", 15)
      .attr("width", 15)
      .attr("stroke", "white");
    const headText = divsGroup.append("text");
    const countText = divsGroup.append("text");
    const tgfText = divsGroup.append("text");
    const trfText = divsGroup.append("text");
    const kpiText = divsGroup.append("text");
    Object.assign(textObj, {
      [d]: { headRect, headText, countText, tgfText, trfText, kpiText },
    });
  });

  return textObj;
};

const generateHeadRowText = (
  tipChart: d3.Selection<SVGGElement, unknown, null, undefined>,
  heads: string[]
) => {
  const textObj: {
    [div: string]: {
      headRowText: d3.Selection<SVGTextElement, unknown, null, undefined>;
      gocText: d3.Selection<SVGTextElement, unknown, null, undefined>;
    };
  } = {};

  const divsGroup = tipChart.append("g").attr("fill", `white`);

  heads.forEach((d, i) => {
    const headRowText = divsGroup.append("text").attr("fill", "gold");
    const gocText = divsGroup.append("text");
    // const countText = divsGroup.append("text");
    // const tgfText = divsGroup.append("text");
    // const trfText = divsGroup.append("text");
    // const kpiText = divsGroup.append("text");
    Object.assign(textObj, {
      [d]: { headRowText, gocText },
    });
  });

  return textObj;
};
