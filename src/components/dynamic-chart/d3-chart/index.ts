import { svgAppend } from "./setup/d3Utils";
import { ChartOptions } from "./setup/models";
import { barChart } from "./charts/barChart";

export const d3Chart = (element: HTMLDivElement, width: number, height: number, data: any[]) => {
  const chartData = data;
  const getData = () => chartData;

  const chartOptions = {
    height,
    width,
  };

  const svg = svgAppend(element);
  svg.attr("width", chartOptions.width).attr("height", chartOptions.height);

  const getChartOptions = () => chartOptions;
  const setChartOptions = (option: ChartOptions) => {
    Object.assign(chartOptions, option);
  };

  return {
    barChart: () => barChart(svg, getData(), getChartOptions()),
  };
};
