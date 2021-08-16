import { FC, useEffect, useRef, useState } from "react";
import { ChartContainer } from "./ProgressChart.styles";

import { d3Chart } from "./chart";
import { ChartData } from "./chart/models";

interface ChartUpdate {
  updateData: (newData: ChartData) => void;
}

interface ProgressChartProps {
  width: number;
  height: number;
  row?: number;
  col?: [number, number];
  updateFunction: (barObj: ChartUpdate) => void;
}

const ProgressChart: FC<ProgressChartProps> = ({
  width,
  height,
  row,
  col,
  updateFunction,
}) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }
    const chart = d3Chart(chartDiv.current, width, height);

    const progressChart = chart.progressChart();

    updateFunction(progressChart);
    progressChart.updateData([
      { name: "GOC", tgf: 2000, trf: 1500, count: 450, kpi: 20, target: 700 },
    ]);
    setBarC(progressChart);
  }, []);

  return (
    <ChartContainer
      ref={chartDiv}
      width={width}
      height={height}
      row={row}
      col={col}
    ></ChartContainer>
  );
};

export default ProgressChart;
