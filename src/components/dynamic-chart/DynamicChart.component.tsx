import { FC, useEffect, useRef, useState } from "react";
import { DynamicChartContainer } from "./DynamicChart.styles";

import { d3Chart } from "./d3-chart";

const data = [
  { value: 272, name: "Hashem" },
  { value: 124, name: "Sami" },
  { value: 200, name: "Moh" },
  { value: 220, name: "Kareem" },
  { value: 185, name: "Sara" },
  { value: 185, name: "Sarasss" },
  { value: 185, name: "Hashhhhhh" },
];
const data2 = [
  { value: 124, name: "Sami" },
  { value: 220, name: "Kareem" },
  { value: 185, name: "Sarasd" },
  { value: 185, name: "Saraff" },
  { value: 185, name: "Saragh" },
];

interface DynamicChartProps {
  width: number;
  height: number;
}

const DynamicChart: FC<DynamicChartProps> = ({ width, height }) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }
    const chart = d3Chart(chartDiv.current, width, height, data);

    const barChart = chart.barChart();

    setBarC(barChart);
  }, []);

  const updateBar = () => {
    barC.updateData(data2);
    // barC.barChart(data);
  };
  const updateBar2 = () => {
    barC.updateData(data);
    // barC.barChart(data);
  };

  return (
    <div>
      <DynamicChartContainer ref={chartDiv} width={width} height={height}></DynamicChartContainer>
      <button onClick={updateBar}>upda</button>
      <button onClick={updateBar2}>upda</button>
    </div>
  );
};

export default DynamicChart;
