import * as d3 from "d3";

export const svgAppend = (element: HTMLDivElement) => {
  return d3.select(element).append("svg");
};

export const linearScale = (
  valuesRange: [number, number],
  canvasRange: [number, number]
) => {
  return d3.scaleLinear().domain(valuesRange).range(canvasRange);
};

export const bandScale = (
  listOfNames: string[],
  canvasRange: [number, number]
) => {
  return d3.scaleBand().domain(listOfNames).range(canvasRange);
};

export const getMaxValue = (data: { name: string; value: number }[]) => {
  return d3.max(data, ({ value }) => value);
};

export const getMinValue = (data: { name: string; value: number }[]) => {
  return d3.min(data, ({ value }) => value);
};

export const generateBarXAxis = (xAxis: d3.ScaleBand<string>) => {
  return d3.axisBottom(xAxis);
};

export const generateBarYAxis = (
  yAxis: d3.ScaleLinear<number, number, never>
) => {
  return d3.axisLeft(yAxis);
};
