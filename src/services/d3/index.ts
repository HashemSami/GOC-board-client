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

export const generateBarXAxis = () => {
  return d3.axisBottom;
};

export const generateBarYAxis = () => {
  return d3.axisLeft;
};

export const generateTip = () => {};

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

// =====================================================
// for Map display

export const geoGraticule = () => {
  return d3.geoGraticule();
};

export const generateGeoPath = (width: number, height: number) => {
  const projection = d3
    .geoMercator()
    .center([49, 24])
    .scale(1300)
    .translate([width / 2, height / 2])
    .precision(0.3);

  return d3.geoPath(projection);
};

// ====================================================
// for timeline

export const timeScale = (
  valuesRange: [Date, Date],
  canvasRange: [number, number]
) => {
  return d3.scaleTime().domain(valuesRange).range(canvasRange);
};

export const d3Zoom = () => d3.zoom<SVGRectElement, unknown>();

// d3.timeFormat("%I %p")]
