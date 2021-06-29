import { FC, useEffect, useRef, useState } from "react";
import { DynamicChartContainer } from "./TimelineNavigator.styles";

import { d3Timeline } from "./d3-timeline";
import { ChartProps } from "../../models";

interface MapProps {
  width: number;
  height: number;
}

const TimelineNavigator: FC<ChartProps> = ({
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
    const chart = d3Timeline(chartDiv.current, width, height);

    const barChart = chart.timeLineNav();

    // updateFunction(barChart);
    // setBarC(barChart);
  }, []);

  return (
    <DynamicChartContainer
      ref={chartDiv}
      width={width}
      height={height}
    ></DynamicChartContainer>
  );
};

export default TimelineNavigator;
