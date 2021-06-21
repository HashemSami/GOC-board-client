import { FC, useEffect, useRef } from "react";
import { DynamicChartContainer } from "./DynamicChart.styles";

import { d3Chart } from "./d3-chart";

const data = [
  { value: 272, name: "Hashem" },
  { value: 124, name: "Sami" },
  { value: 200, name: "Moh" },
  { value: 220, name: "Kareem" },
  { value: 185, name: "Sara" },
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

    chart.barChart(data);
  });

  return (
    <DynamicChartContainer
      ref={chartDiv}
      width={width}
      height={height}
    ></DynamicChartContainer>
  );
};

export default DynamicChart;
