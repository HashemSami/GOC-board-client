import { barChart } from "../components/dynamic-chart/d3-chart/charts/barChart";

export interface BarChartObj {
  updateData: (
    newData: {
      name: string;
      value: number;
    }[]
  ) => void;
}

interface Chart {
  width: number;
  height: number;
}

export interface BarChart {
  chartType: "barChart";
  updateFunction: (barObj: BarChartObj) => void;
}

export type ChartProps = Chart & BarChart;
