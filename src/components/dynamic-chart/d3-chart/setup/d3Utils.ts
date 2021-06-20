import * as d3 from "d3";

export const svgAppend = (element: HTMLDivElement) => {
  return d3.select(element).append("svg");
};

export const linearScale = (valuesRange: [number, number], canvasRange: [number, number]) => {
  return d3.scaleLinear().domain(valuesRange).range(canvasRange);
};

export const bandScale = (listOfNames: string[], canvasRange: [number, number]) => {
  return d3.scaleBand().domain(listOfNames).range(canvasRange);
};
