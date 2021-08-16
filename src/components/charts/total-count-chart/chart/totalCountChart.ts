import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
  generateBarYAxisRight,
  generateLine,
} from "../../../../services/d3";

import {
  drawCenterLine,
  countBarsGenerator,
  tgfBarGenerator,
  trfBarGenerator,
  kpiGenerator,
} from "./utils";

import { generateValueTip } from "../../../tooltips/chartsToolTips/valueTips";

import { ChartOptions } from "./models";
import { ChartData } from "./models";

export const totalCountChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const mainTextColor = "white";
  const { width, height, margin } = chartOptions;

  svg.attr("fill", mainTextColor);

  // generates axis and labels
  const ChartTitle = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -(margin.top / 2))
    .attr("fill", mainTextColor)
    .attr("text-anchor", "middle");

  const ChartLeftLabel = svg
    .append("text")
    .attr("x", -(height / 2))
    .attr("y", -(margin.left / 2))
    .attr("fill", mainTextColor)
    .attr("text-anchor", "middle")
    // rotating the text will also rotate the x and the y axis
    // that are belong to the text
    .attr("transform", "rotate(-90)");

  const ChartRightLabel = svg
    .append("text")
    .attr("x", height / 2)
    .attr("y", -(width + margin.left / 2))
    .attr("fill", mainTextColor)
    .attr("text-anchor", "middle")
    // rotating the text will also rotate the x and the y axis
    // that are belong to the text
    .attr("transform", "rotate(90)");

  const xAxisSvg = svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("class", "axis-bar")
    .attr("style", "font-size:0.8em");

  const yAxisLeftSvg = svg.append("g").attr("class", "axis-bar");

  const yAxisRightSVG = svg
    .append("g")
    .attr("class", "axis-bar")
    .attr("transform", `translate(${width},0)`);

  // generate bars groups
  const footageBars = svg.append("g");
  const tgfBar = footageBars.append("g");
  const trfBar = footageBars.append("g");

  // generates line path
  const lineGenerator = generateLine();
  const countCir = svg.append("g");
  const countLine = countCir.append("path");

  // parsentage rect
  const percentRect = svg.append("g");

  const progressBar = svg.append("g");

  const bit = svg.append("g");

  const countTip = svg.append("g").attr("fill", mainTextColor);
  const footageTip = svg.append("g").attr("fill", mainTextColor);

  return {
    updateData: (newData: ChartData) => {
      ChartTitle.text("Total Count Activity");
      ChartLeftLabel.text("TD Count");
      ChartRightLabel.text("TGF / TRF");

      // ------------------------------------------------------------
      // xAxis
      // will also do the scaling for the x values (the fields names)
      const x = bandScale(
        newData.map((d) => d.monthName),
        [0, width]
      );
      x.padding(0.3);

      const xAxisCall = generateBarXAxis()(x);

      const midPoint = x.bandwidth() / 2;

      // ------------------------------------------------------------
      // yAxis

      const tgfMaxVal = newData.reduce((acc, cur) => {
        return acc < cur.tgf ? cur.tgf : acc;
      }, 0);

      const countMaxVal = newData.reduce((acc, cur) => {
        return acc < cur.count ? cur.count : acc;
      }, 0);

      const yCount = linearScale([0, countMaxVal + 100], [height, 0]);

      const yTgf = linearScale([0, tgfMaxVal + 1000], [height, 0]);

      const yTip = linearScale([0, countMaxVal + 100], [200, 0]);
      // const yKpi = linearScale([0, 100], [0, width / 2 - 30]);

      const yCountAxisCall = generateBarYAxis()(yCount)
        .ticks(8)
        .tickSize(-width);
      const yTgfAxisCall = generateBarYAxisRight()(yTgf).ticks(8);

      // ------------------------------------------------------------

      const lineData: [number, number][] = newData.map((d) => {
        const xVal = x(d.monthName);
        return [xVal ? xVal + midPoint : 0, yCount(d.count)];
      });

      lineGenerator(lineData);
      lineGenerator.x((d) => d[0]);
      lineGenerator.y((d) => d[1]);
      const line = lineGenerator(lineData);

      // draw rects

      // DATA JOIN
      const countDis = countCir.selectAll("circle").data(newData);
      const tgfrect = tgfBar.selectAll("rect").data(newData);
      const trfrect = trfBar.selectAll("rect").data(newData);

      // EXIT
      countDis
        .exit()
        .transition()
        .duration(500)
        .attr("y", height)
        .attr("height", 0)
        .remove();

      // UPDATE

      xAxisSvg.transition().duration(500).call(xAxisCall);
      yAxisLeftSvg.transition().duration(500).call(yCountAxisCall);
      yAxisRightSVG.transition().duration(500).call(yTgfAxisCall);

      countDis
        .transition()
        .duration(500)
        .attr("x", (data, i) => {
          const xVal = x(data.monthName);
          return xVal ? xVal : null;
        })
        .attr("y", (d) => yCount(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - yCount(d.count));

      // adding to the enter() phase
      // ENTER

      tgfBarGenerator({
        rects: tgfrect,
        x,
        y: yTgf,
        options: { height, width, midPoint, tip: footageTip, svg },
      });

      trfBarGenerator({
        rects: trfrect,
        x,
        y: yTgf,
        options: { height, width, midPoint, tip: footageTip, svg },
      });

      countBarsGenerator(
        {
          rects: countDis,
          x,
          y: yCount,
          options: { height, width, midPoint, tip: countTip, svg },
        },
        chartOptions,
        { xAxisSvg, yAxisRightSVG, yAxisLeftSvg }
      );

      countLine
        .style("fill", "transparent")
        .attr("stroke", "brown")
        // .attr("stroke-dasharray", "8,3,2")
        .attr("stroke-width", 4)
        .transition()
        .duration(350)
        .attr("d", line ? line : "");
    },
  };
};
