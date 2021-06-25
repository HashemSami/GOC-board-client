import { FC, useEffect, useRef, useState } from "react";
import { DynamicChartContainer } from "./MapChart.styles";

import { d3Chart } from "./d3-map";
import { ChartProps } from "../../models";

interface MapProps {
  width: number;
  height: number;
}

const MapChart: FC<ChartProps> = ({ width, height, updateFunction }) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }
    const chart = d3Chart(chartDiv.current, width, height);

    const barChart = chart.mapChart();

    updateFunction(barChart);
    setBarC(barChart);
  }, []);

  return <DynamicChartContainer ref={chartDiv} width={width} height={height}></DynamicChartContainer>;
};

export default MapChart;
