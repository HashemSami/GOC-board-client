import {
  ChartOptions,
  DaysChartData,
  DataModel,
  DaysDataModel,
} from "../models";
import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
  generateBarYAxisRight,
  generateLine,
} from "../../../../../services/d3";

import {
  drawCenterLine,
  countBarsGenerator,
  tgfBarGenerator,
  trfBarGenerator,
  kpiGenerator,
} from "./daysUtils";

import { chartColors } from "../../../../../styles/colors";

import { generateDaysTestData } from "../testData";

export const generateDaysChart = (
  chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions,
  axisSvg: {
    xAxisSvg: d3.Selection<SVGGElement, unknown, null, undefined>;
    yAxisLeftSvg: d3.Selection<SVGGElement, unknown, null, undefined>;
    yAxisRightSVG: d3.Selection<SVGGElement, unknown, null, undefined>;
  }
) => {
  const mainTextColor = chartColors.chartText;
  const { width, height, margin } = chartOptions;
  // const { xAxisSvg, yAxisLeftSvg, yAxisRightSVG } = axisSvg;

  const group = chartSvg
    .append("svg")
    .attr("x", -margin.left)
    .attr("y", -margin.top);
  const background = group
    .append("rect")
    .attr("fill", chartColors.chartBackground);

  const svg = group
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

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
    .attr("class", "axis-bar");

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

  const countTip = svg.append("g").attr("fill", mainTextColor);
  return {
    updateData: (newData: DataModel) => {
      group
        .transition()
        .duration(500)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      background
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      ChartLeftLabel.text("TD Count");
      ChartRightLabel.text("TGF / TRF");

      // here where we can fitch the days data from the server before display

      const daysData = generateDaysTestData();
      console.log(daysData);

      const monthData = daysData[newData.monthName];
      const chartData = Object.keys(monthData).map((d) => monthData[d]);
      const monthName = `${chartData[0].monthName} ${chartData[0].year}`;

      ChartTitle.text(monthName);
      // ------------------------------------------------------------
      // xAxis
      // will also do the scaling for the x values (the fields names)
      const x = bandScale(
        chartData.map((d) => d.dayNumber),
        [0, width]
      );
      x.padding(0.3);

      const xAxisCall = generateBarXAxis()(x);

      const midPoint = x.bandwidth() / 2;

      // ------------------------------------------------------------
      // yAxis

      const tgfMaxVal = chartData.reduce((acc, cur) => {
        return acc < cur.tgf ? cur.tgf : acc;
      }, 0);

      const countMaxVal = chartData.reduce((acc, cur) => {
        return acc < cur.count ? cur.count : acc;
      }, 0);

      const yCount = linearScale([0, countMaxVal + 100], [height, 0]);

      const yTgf = linearScale([0, tgfMaxVal + 1000], [height, 0]);

      // const yTip = linearScale([0, countMaxVal + 100], [200, 0]);
      // const yKpi = linearScale([0, 100], [0, width / 2 - 30]);

      const yCountAxisCall = generateBarYAxis()(yCount)
        .ticks(8)
        .tickSize(-width);
      const yTgfAxisCall = generateBarYAxisRight()(yTgf).ticks(8);

      // ------------------------------------------------------------

      const lineData: [number, number][] = chartData.map((d) => {
        const xVal = x(d.dayNumber);
        return [xVal ? xVal + midPoint : 0, yCount(d.count)];
      });

      lineGenerator(lineData);
      lineGenerator.x((d) => d[0]);
      lineGenerator.y((d) => d[1]);
      const line = lineGenerator(lineData);

      // draw rects

      // DATA JOIN
      const countDis = countCir.selectAll("circle").data(chartData);
      const tgfrect = tgfBar.selectAll("rect").data(chartData);
      const trfrect = trfBar.selectAll("rect").data(chartData);

      // EXIT
      countDis
        .exit()
        .transition()
        .duration(500)
        .attr("y", height)
        .attr("height", 0)
        .remove();

      tgfrect
        .exit()
        .transition()
        .duration(500)
        .attr("y", height)
        .attr("height", 0)
        .remove();

      trfrect
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
        .attr("cx", (data, i) => {
          const xVal = x(data.dayNumber);
          return xVal ? xVal + midPoint : null;
        })
        .attr("cy", (d) => yCount(d.count));
      // .attr("width", x.bandwidth())
      // .attr("height", d => height - yCount(d.count));

      tgfrect
        .attr("x", (data, i) => {
          // const xVal = x(data.name);
          const xVal = x(data.dayNumber);
          return xVal ? xVal : null;
        })
        .attr("y", height)
        .attr("y", (d) => yTgf(d.tgf))
        .attr("height", (d) => height - yTgf(d.tgf));

      trfrect
        .attr("x", (data, i) => {
          // const xVal = x(data.name);
          const xVal = x(data.dayNumber);
          return xVal ? xVal : null;
        })
        .attr("y", height)
        // .transition()
        // .duration(1400)
        .attr("y", (d) => yTgf(d.trf))
        .attr("height", (d) => height - yTgf(d.trf));

      // adding to the enter() phase
      // ENTER

      tgfBarGenerator({
        rects: tgfrect,
        x,
        y: yTgf,
        options: { height, width, midPoint, tip: countTip, svg },
      });

      trfBarGenerator({
        rects: trfrect,
        x,
        y: yTgf,
        options: { height, width, midPoint, tip: countTip, svg },
      });

      countBarsGenerator(
        {
          rects: countDis,
          x,
          y: yCount,
          options: { height, width, midPoint, tip: countTip, svg },
        },
        chartOptions,
        group
      );

      countLine
        .style("fill", "transparent")
        .attr("stroke", chartColors.countLine)
        .attr("stroke-width", 4)
        .transition()
        .duration(350)
        .attr("d", line ? line : "");
    },
  };
};
