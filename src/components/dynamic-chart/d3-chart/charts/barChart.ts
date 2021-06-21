import { linearScale, bandScale, getMaxValue, generateBarXAxis, generateBarYAxis } from "../setup/d3Utils";
import { ChartOptions } from "../setup/models";

export const barChart = (data: { name: string; value: number }[], svg: d3.Selection<SVGGElement, unknown, null, undefined>, chartOptions: ChartOptions) => {
  const { width, height, margin } = chartOptions;

  // ------------------------------------------------------------
  // xAxis
  // will also do the scaling for the x values (the fields names)
  const x = bandScale(
    data.map(d => d.name),
    [0, width]
  );
  x.padding(0.5);

  const xAxisCall = generateBarXAxis(x);
  // we need to call our xAxis generator on our svg
  // but we need to append them to a group to make both axis
  // show on the screen, and add the transform to move it to the bottom
  // of the canvas
  svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxisCall);

  // ------------------------------------------------------------
  // yAxis
  const max = getMaxValue(data);
  // here we will set the scale of our bar chart to fit all the data into
  // our visulaization
  const y = linearScale([0, max ? max : 1000], [0, height]);

  const yAxisCall = generateBarYAxis(y);
  // we need to call our yAxis generator on our svg
  // but we need to append them to a group to make both axis
  // show on the screen
  svg.append("g").call(yAxisCall);

  // ------------------------------------------------------------
  // draw rects
  // we can use d3 selectAll method to add visulizaion to our data
  // instead of looping through all the data with for each
  // after adding the data to the SVG, we can save it in a variable.
  const rects = svg.selectAll("rect").data(data);

  // once you set your data using the data() method, you can have access to all the data
  // and the data eteration number in inside the attributes setters as a function
  // console.log(x("Hashem"));
  // console.log(x.bandwidth());
  rects
    .enter()
    .append("rect")
    .attr("x", (data, i) => {
      const xVal = x(data.name);
      return xVal ? xVal : null;
    })
    .attr("y", d => height - y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => y(d.value))
    .attr("fill", "red");

  // basic version
  // data.forEach((d, i) => {
  //   svg
  //     .append("rect")
  //     .attr("x", i * 100)
  //     .attr("y", 50)
  //     .attr("width", 50)
  //     .attr("height", d)
  //     .attr("fill", "red");
  // });
};
