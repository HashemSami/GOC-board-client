import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
  generateBarYAxisRight,
} from "../../../../services/d3";

import {
  progressBarGenerator,
  tgfBarGenerator,
  trfBarGenerator,
} from "./utils";

import { ChartOptions } from "./models";
import { ChartData } from "./models";

export const progressChart = (
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

  // generate bars groups
  const footageBars = svg.append("g");
  const tgfBar = footageBars.append("g");
  const trfBar = footageBars.append("g");

  // parsentage rect
  const percentRect = svg.append("g");

  const progressBar = svg.append("g");

  const bit = svg.append("g");

  return {
    updateData: (newData: ChartData) => {
      ChartTitle.text(`${newData[0].name} target progress`);

      const target = newData[0].target;
      const count = newData[0].count;
      const gf = newData[0].tgf;

      // x scale
      const x = linearScale([0, target], [0, width]);
      const xFootage = linearScale([0, gf], [0, x(count) + 20]);
      // ------------------------------------------------------------
      // draw rects

      // DATA JOIN
      const progressRect = progressBar.selectAll("rect").data(newData);
      const tgfrect = tgfBar.selectAll("rect").data(newData);
      const trfrect = trfBar.selectAll("rect").data(newData);

      // EXIT
      progressRect
        .exit()
        .transition()
        .duration(500)
        .attr("y", height)
        .attr("height", 0)
        .remove();

      // UPDATE

      // progressRect
      // .transition()
      // .duration(500)
      // .attr("x", (data, i) => {
      //   const xVal = x(data.name);
      //   return xVal ? xVal : null;
      // })
      // .attr("y", (d) => yCount(d.count))
      // .attr("width", x.bandwidth())
      // .attr("height", (d) => height - yCount(d.count));

      // adding to the enter() phase
      // ENTER

      tgfBarGenerator({
        rects: tgfrect,
        x: xFootage,
        options: { height, width, svg, bit },
      });

      trfBarGenerator({
        rects: trfrect,
        x: xFootage,
        options: { height, width, svg, bit },
      });

      progressBarGenerator({
        rects: progressRect,
        x,
        options: { height, width, svg: percentRect, bit },
      });
    },
  };
};
