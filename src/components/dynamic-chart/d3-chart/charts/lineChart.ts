import { linearScale, bandScale, getMaxValue, generateBarXAxis, generateBarYAxis, getMinValue, generateLine } from "../setup/d3Utils";
import { ChartOptions } from "../setup/models";

export const lineChart = (svg: d3.Selection<SVGGElement, unknown, null, undefined>, chartOptions: ChartOptions) => {
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
    .attr("transform", "rotate(-90)");

  // generates axis bars
  const xAxisSvg = svg.append("g").attr("transform", `translate(0, ${height})`);

  const yAxisSvg = svg.append("g");

  const lineGenerator = generateLine();

  // generates line path
  const lines = svg.append("path");

  return {
    updateData: (newData: { name: string; value: number }[]) => {
      ChartTitle.text("Bar Chart Title");
      ChartLeftLabel.text("Axis Title");

      // ------------------------------------------------------------
      // xAxis
      const x = bandScale(
        newData.map(d => d.name),
        [0, width]
      );
      x.padding(0.5);

      const midPoint = x.bandwidth() / 2;

      const xAxisCall = generateBarXAxis()(x);

      // ------------------------------------------------------------
      // yAxis
      const max = getMaxValue(newData);
      const min = getMinValue(newData);
      const y = linearScale([min ? min * 0.95 : 0, max ? max + 10 : 1000], [height, 0]);

      const yAxisCall = generateBarYAxis(y);

      // ------------------------------------------------------------

      const reshapeData = (data: { name: string; value: number }[]): [number, number][] =>
        data.map((d, i) => {
          const xVal = x(d.name);
          return [xVal ? xVal + midPoint : 0, y(d.value)];
        });

      lineGenerator.x((d, i) => d[0]);
      lineGenerator.y(d => {
        console.log(d);
        return d[1];
      });

      const line = lineGenerator(reshapeData(newData));
      // ------------------------------------------------------------
      // draw plots

      // DATA JOIN
      const plots = svg.selectAll("circle").data(newData);

      // EXIT
      plots.exit().transition().duration(500).attr("cy", height).attr("height", 0).style("opacity", 0).remove();

      // UPDATE
      xAxisSvg.transition().duration(500).call(xAxisCall);
      yAxisSvg.transition().duration(500).call(yAxisCall);

      plots
        .transition()
        .duration(500)
        .attr("cx", (data, i) => {
          const xVal = x(data.name);
          return xVal ? xVal + midPoint : null;
        })
        .attr("cy", d => y(d.value));

      // adding to the enter() phase
      // ENTER
      plots
        .enter()
        .append("circle")
        .attr("cx", (data, i) => {
          const xVal = x(data.name);
          return xVal ? xVal + midPoint : null;
        })
        .attr("r", 5)
        .attr("fill", "red")
        .attr("cy", height)
        .style("opacity", 0)
        .transition()
        .duration(500)
        .style("opacity", 1)
        .attr("cy", d => y(d.value));

      // Exit

      // lines.exit().transition().duration(300).style("opacity", 0).remove();

      // UPDATE
      // lines
      //   .transition()
      //   .duration(500)
      //   .attr("d", line ? line : "");
      // ENTER
      lines
        .style("fill", "transparent")
        .attr("stroke", "black")
        .transition()
        .duration(350)
        .attr("d", line ? line : "");
    },
  };
};
