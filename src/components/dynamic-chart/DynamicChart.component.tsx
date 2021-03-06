import { FC, useEffect, useRef, useState } from "react";
import { DynamicChartContainer } from "./DynamicChart.styles";

import { d3Chart } from "./d3-chart";
import { ChartProps } from "../../models";

interface DynamicChartProps {
  width: number;
  height: number;
}

const DynamicChart: FC<ChartProps> = ({ width, height, updateFunction }) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }
    const chart = d3Chart(chartDiv.current, width, height);

    const barChart = chart.barChart();

    updateFunction(barChart);
    setBarC(barChart);
  }, []);

  return (
    <DynamicChartContainer
      ref={chartDiv}
      width={width}
      height={height}
    ></DynamicChartContainer>
  );
};

export default DynamicChart;
