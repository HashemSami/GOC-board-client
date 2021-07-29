export const generateCabonatePattern = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>
) => {
  const carPattern = svg
    .append("g")
    .append("defs")
    .append("pattern")
    .attr("id", "pattern1");
  carPattern
    .attr("x", "10")
    .attr("y", "10")
    .attr("width", "20")
    .attr("height", "20")
    .attr("patternUnits", "userSpaceOnUse")
    .append("circle")
    .attr("cx", "10")
    .attr("cy", "10")
    .attr("r", "10")
    .attr("style", "stroke: none; fill: #0000ff");
};
