import { FC, useEffect, useRef, useState } from "react";
import { ChartContainer } from "./ClasticVsCarbonte.styles";

import { d3Chart } from "./chart";
import { ChartData } from "./chart/models";

interface ChartUpdate {
  updateData: (newData: ChartData) => void;
}

interface ClasticVsCarbonateChartProps {
  width: number;
  height: number;
  updateFunction: (barObj: ChartUpdate) => void;
}

const ClasticVsCarbonateChart: FC<ClasticVsCarbonateChartProps> = ({
  width,
  height,
  updateFunction,
}) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }
    const chart = d3Chart(chartDiv.current, width, height);

    const clasticVsCarbonateChart = chart.clasticVsCarbonateChart();

    updateFunction(clasticVsCarbonateChart);
    clasticVsCarbonateChart.updateData([
      { name: "clastic", tgf: 2000, trf: 1500, count: 450, kpi: 20 },
      { name: "carbonate", tgf: 2500, trf: 1700, count: 670, kpi: 100 },
    ]);
    setBarC(clasticVsCarbonateChart);
  }, []);

  return (
    <ChartContainer
      ref={chartDiv}
      width={width}
      height={height}
    ></ChartContainer>
  );
};

export default ClasticVsCarbonateChart;
