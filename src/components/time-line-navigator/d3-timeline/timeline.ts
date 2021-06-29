import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
  timeScale,
} from "../../../services/d3";
import { ChartOptions } from "./models";
// import { generateValueTip } from "../../../tooltips/chartsToolTips/valueTips";

export const timeLineNav = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const { width, height, margin } = chartOptions;

  const innerMargin = { top: 20, bottom: 20, right: 20, left: 20 };

  const windowHeight = height / 2;

  const topWindowLocation = margin.top;
  const bottomWindowLocation = windowHeight;
  const innerWidth = width - margin.left - margin.right;
  const innerTopHeight = windowHeight - margin.top;
  const innerBottomHeight = windowHeight - margin.bottom;

  const main = svg.append("g");
  main
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "transparent")
    .style("stroke", "black");

  // ===============================================
  // seeting up windows
  const navigationWindow = main.append("g");
  navigationWindow
    .append("rect")
    .attr("width", innerWidth)
    .attr("height", innerTopHeight)
    .attr("transform", `translate(${margin.left},${topWindowLocation})`)
    .style("fill", "transparent")
    .style("stroke", "black");

  const chartWindow = main.append("g");
  chartWindow
    .append("rect")
    .attr("width", innerWidth)
    .attr("height", innerBottomHeight)
    .attr("transform", `translate(${margin.left},${windowHeight})`)
    .style("fill", "transparent")
    .style("stroke", "black");

  // ===============================================
  // seeting up charts
  const chartHeight = 130;
  const chartWidth = innerWidth - innerMargin.left - innerMargin.right;
  const navigationChart = chartWindow
    .append("g")
    .append("rect")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .attr(
      "transform",
      `translate(${margin.left + innerMargin.left},${
        bottomWindowLocation + innerMargin.top + 30
      })`
    )
    .style("fill", "transparent")
    .style("stroke", "black");

  // generates axis labels
  const ChartTitle = navigationWindow
    .append("text")
    .attr("x", width / 2)
    .attr("y", topWindowLocation + innerMargin.top)
    .attr("text-anchor", "middle");
  ChartTitle.text("Chart Title");

  const NavChartTitle = chartWindow
    .append("text")
    .attr("x", width / 2)
    .attr("y", bottomWindowLocation + innerMargin.top)
    .attr("text-anchor", "middle");
  // .attr("transform", "rotate(-90)");
  NavChartTitle.text("Axis Title");

  const xAxisSvg = svg
    .append("g")
    .attr(
      "transform",
      `translate(0, ${bottomWindowLocation + innerMargin.top})`
    );

  const yAxisSvg = svg.append("g");

  // const tip = generateValueTip(svg, -10);

  return {
    updateData: (newData: [minDate: Date, maxDate: Date]) => {
      const [minDate, maxDate] = newData;
      ChartTitle.text("Bar Chart Title");
      NavChartTitle.text("Axis Title");
      // ------------------------------------------------------------
      // xAxis
      // will also do the scaling for the x values (the fields names)
      const x = timeScale([minDate, maxDate], [0, width]);

      const xAxisCall = generateBarXAxis()(x);

      // xAxisSvg.call(xAxisCall);

      // ------------------------------------------------------------
      // // yAxis
      // const max = getMaxValue(newData);
      // const min = getMinValue(newData);
      // // here we will set the scale of our bar chart to fit all the data into
      // // our visulaization
      // const y = linearScale([min ? min * 0.95 : 0, max ? max + 10 : 1000], [height, 0]);

      // const yAxisCall = generateBarYAxis(y);
      // we need to call our yAxis generator on our svg
      // but we need to append them to a group to make both axis
      // show on the screen

      // ------------------------------------------------------------
      // ------------------------------------------------------------
      // draw rects
      // we can use d3 selectAll method to add visulizaion to our data
      // instead of looping through all the data with for each
      // after adding the data to the SVG, we can save it in a variable.

      // DATA JOIN
      const rects = svg.selectAll("rect").data(newData);
      // once you set your data using the data() method, you can have access to all the data
      // and the data eteration number in inside the attributes setters as a function
      // console.log(x("Hashem"));
      // console.log(x.bandwidth());

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
      // yAxisSvg.transition().duration(500).call(yAxisCall);

      rects
        .transition()
        .duration(500)
        .attr("x", (data, i) => {
          const xVal = x(data);
          return xVal ? xVal : null;
        });

      // adding to the enter() phase
      // ENTER
      rects
        .enter()
        .append("rect")
        .on("mousemove", (e, d) => {
          e.target.style.fill = "yellow";
        })
        .on("mouseout", (e, d) => {
          e.target.style.fill = "red";
        })
        .attr("x", (data, i) => {
          const xVal = x(data);
          return xVal ? xVal : null;
        })
        .attr("fill", "red")
        .attr("y", height)
        .transition()
        .duration(500);
    },
  };
};
