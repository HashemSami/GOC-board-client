import { svgAppend } from "../../../../services/d3";
import { ChartOptions } from "./models";
import { totalCountChart } from "./totalCountChart";

export const d3Chart = (
  element: HTMLDivElement,
  width: number,
  height: number
) => {
  // let chartData = data;
  // const getData = () => chartData;
  // const setData = (newData: { name: string; value: number }[]) => (chartData = [...newData]);

  // to seperate the data visulaization fro the eadge of
  // the canvas or the svg
  const margin = { top: 60, bottom: 80, left: 80, right: 80 };

  const chartOptions = {
    height: height - margin.top - margin.bottom,
    width: element.clientWidth - margin.left - margin.right,
    margin,
  };

  const svgCanv = svgAppend(element);
  svgCanv
    .attr("width", chartOptions.width + margin.left + margin.right)
    .attr("height", chartOptions.height + margin.top + margin.bottom);

  // the variable will be referencing the svg group(g) inside the svg canvas
  // that will be centered in the canvas, and has the margin we set for it
  const svg = svgCanv
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const getChartOptions = () => chartOptions;
  const setChartOptions = (option: ChartOptions) => {
    Object.assign(chartOptions, option);
  };

  return {
    totalCountChart: () => totalCountChart(svg, getChartOptions()),
  };
};
