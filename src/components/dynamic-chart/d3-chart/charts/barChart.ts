import { linearScale, bandScale } from "../setup/d3Utils";
import { ChartOptions } from "../setup/models";

export const barChart = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, data: any[], chartOptions: ChartOptions) => {
  const { width, height } = chartOptions;
  // here we will set the scale of our bar chart to fit all the data into
  // our visulaization
  const y = linearScale([0, 300], [0, height]);

  // will also do the scaling for the x values (the fields names)
  const x = bandScale(
    data.map(d => d),
    [0, width]
  );
  x.padding(0.2);

  // we can use d3 selectAll method to add visulizaion to our data
  // instead of looping through all the data with for each
  // after adding the data to the SVG, we can save it in a variable.
  const rects = svg.selectAll("rect").data(data);

  // once you set your data using the data() method, you can have access to all the data
  // and the data eteration number in inside the attributes setters as a function
  rects
    .enter()
    .append("rect")
    .attr("x", (data, i) => data)
    .attr("y", 10)
    .attr("width", 50)
    .attr("height", d => y(d.height))
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
