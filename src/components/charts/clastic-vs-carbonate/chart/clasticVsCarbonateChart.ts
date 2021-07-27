import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
  generateBarYAxisRight,
} from "../../../../services/d3";
import { ChartOptions } from "./models";
import { generateValueTip } from "../../../tooltips/chartsToolTips/valueTips";
import { ChartData } from "./models";

export const clasticVsCarbonateChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const { width, height, margin } = chartOptions;

  // generates axis labels
  const ChartTitle = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom / 2)
    .attr("text-anchor", "middle");

  const ChartLeftLabel = svg
    .append("text")
    .attr("x", -(height / 2))
    .attr("y", -(margin.left / 2))
    .attr("text-anchor", "middle")
    // rotating the text will also rotate the x and the y axis
    // that are belong to the text
    .attr("transform", "rotate(-90)");

  const xAxisSvg = svg.append("g").attr("transform", `translate(0, ${height})`);

  const yAxisLeftSvg = svg.append("g");

  const yAxisRightSVG = svg.append("g");

  const tip = generateValueTip(svg, -10);

  return {
    updateData: (newData: ChartData) => {
      ChartTitle.text("Bar Chart Title");
      ChartLeftLabel.text("Axis Title");
      // ------------------------------------------------------------
      // xAxis
      // will also do the scaling for the x values (the fields names)
      const x = bandScale(
        newData.map(d => d.name),
        [0, width]
      );
      x.padding(0.5);

      const xAxisCall = generateBarXAxis()(x);

      const midPoint = x.bandwidth() / 2;

      // xAxisSvg.call(xAxisCall);

      // ------------------------------------------------------------
      // yAxis

      const tgfMaxVal =
        newData[0].tgf > newData[1].tgf ? newData[0].tgf : newData[1].tgf;

      const countMaxVal =
        newData[0].count > newData[1].count
          ? newData[0].count
          : newData[1].count;

      // const max = getMaxValue(maxVal);
      // const min = getMinValue(newData);
      // here we will set the scale of our bar chart to fit all the data into
      // our visulaization
      const yCount = linearScale([0, countMaxVal], [height, 0]);

      const yTgf = linearScale([0, tgfMaxVal], [height, 0]);

      const yCountAxisCall = generateBarYAxis()(yCount);
      const yTgfAxisCall = generateBarYAxisRight()(yTgf);

      // ------------------------------------------------------------
      // draw rects

      // DATA JOIN
      const rects = svg.selectAll("rect").data(newData);

      // EXIT
      rects
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

      rects
        .transition()
        .duration(500)
        .attr("x", (data, i) => {
          const xVal = x(data.name);
          return xVal ? xVal : null;
        })
        .attr("y", d => yCount(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - yCount(d.count));

      // adding to the enter() phase
      // ENTER
      rects
        .enter()
        .append("rect")
        .on("mousemove", (e, d) => {
          e.target.style.fill = "yellow";
          tip.attr("x", e.target.x.baseVal.value + midPoint);
          tip.attr("y", e.target.y.baseVal.value);
          tip.text(`${d.name}`);
        })
        .on("mouseout", (e, d) => {
          e.target.style.fill = "red";
          tip.text("");
        })
        .attr("x", (data, i) => {
          const xVal = x(data.name);
          return xVal ? xVal : null;
        })
        .attr("width", x.bandwidth())
        .attr("fill", "red")
        .attr("y", height)
        .transition()
        .duration(500)
        .attr("y", d => yCount(d.count))
        .attr("height", d => height - yCount(d.count));
    },
  };
};
