import { FC, useEffect, useRef, useState } from "react";
import { ChartContainer } from "./TotalCountChart.styles";

import { d3Chart } from "./chart";
import { ChartData, DivisionName } from "./chart/models";

import { months } from "../../../services/dayjs";

interface ChartUpdate {
  updateData: (newData: ChartData) => void;
}

interface TotalCountChartProps {
  width: number;
  height: number;
  updateFunction: (barObj: ChartUpdate) => void;
}

const testData: ChartData = months.map((d, i) => {
  const rand = Math.floor(Math.random() * 10) + 1;

  const divs: DivisionName = {
    NARCD: {
      name: "NARCD",
      count: 230 * Math.floor(Math.random() * 10) + 1,
      tgf: 800 * rand,
      trf: 500 * rand,
      kpi: 50,
    },
    SARCD: {
      name: "SARCD",
      count: 230 * Math.floor(Math.random() * 10) + 1,
      tgf: 800 * rand,
      trf: 500 * rand,
      kpi: 50,
    },
    GRCD: {
      name: "GRCD",
      count: 230 * Math.floor(Math.random() * 10) + 1,
      tgf: 800 * rand,
      trf: 500 * rand,
      kpi: 50,
    },
  };

  const count = divs.NARCD.count + divs.GRCD.count + divs.SARCD.count;
  const tgf = divs.NARCD.tgf + divs.GRCD.tgf + divs.SARCD.tgf;
  const trf = divs.NARCD.trf + divs.GRCD.trf + divs.SARCD.trf;

  return {
    monthName: d,
    monthNumber: i,
    year: 2021,
    divisions: divs,
    count,
    tgf,
    trf,
    kpi: 50 + i,
  };
});

const TotalCountChart: FC<TotalCountChartProps> = ({
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

    const progressChart = chart.totalCountChart();

    updateFunction(progressChart);

    console.log(testData);

    progressChart.updateData(testData);
    setBarC(progressChart);
  }, []);

  return (
    <ChartContainer
      ref={chartDiv}
      width={width}
      height={height}
    ></ChartContainer>
  );
};

export default TotalCountChart;
