import * as d3 from "d3";
import d3Tip from "d3-tip";

export const svgAppend = (element: HTMLDivElement) => {
  return d3.select(element).append("svg");
};

export const linearScale = (valuesRange: [number, number], canvasRange: [number, number]) => {
  return d3.scaleLinear().domain(valuesRange).range(canvasRange);
};

export const bandScale = (listOfNames: string[], canvasRange: [number, number]) => {
  return d3.scaleBand().domain(listOfNames).range(canvasRange);
};

export const getMaxValue = (data: { name: string; value: number }[]) => {
  return d3.max(data, ({ value }) => value);
};

export const getMinValue = (data: { name: string; value: number }[]) => {
  return d3.min(data, ({ value }) => value);
};

export const generateBarXAxis = () => {
  return d3.axisBottom;
};

export const generateBarYAxis = (yAxis: d3.ScaleLinear<number, number, never>) => {
  return d3.axisLeft(yAxis);
};

export const generateTip = () => {
  const t = d3Tip;
};

// =====================================================
// for line chart
export const generateLine = (curve?: boolean) => {
  const lineGenerator = curve ? d3.line().curve(d3.curveCardinal) : d3.line();
  return lineGenerator;
};

export const generateArea = (curve?: boolean) => {
  const areaGenerator = d3.area();
  return areaGenerator;
};
