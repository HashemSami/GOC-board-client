import { FC, useEffect, useRef } from "react";
import { DynamicChartContainer } from "./DynamicChart.styles";

import { d3Chart } from "./d3-chart";

const data = [
  { height: "272", name: "Hashem" },
  { height: "124", name: "Sami" },
  { height: "200", name: "Moh" },
  { height: "220", name: "Kareem" },
  { height: "185", name: "Sara" },
];

interface DynamicChartProps {
  width: number;
  height: number;
}

const DynamicChart: FC<DynamicChartProps> = ({ width, height }) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }
    const chart = d3Chart(chartDiv.current, width, height, data);

    chart.barChart();
  });

  return <DynamicChartContainer ref={chartDiv} width={width} height={height}></DynamicChartContainer>;
};

export default DynamicChart;
