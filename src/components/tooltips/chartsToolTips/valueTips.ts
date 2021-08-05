export const generateValueTip = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  offset: number
) => {
  const toolTip = svg.append("g").attr("class", "value-tip");

  const textTool = toolTip
    .append("text")
    .style("font-size", "1em")
    .attr("transform", `translate(0, ${offset})`)
    .attr("text-anchor", "middle");

  return textTool;
};

export const generateCenterBarValue = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  offset: number
) => {
  const toolTip = svg
    .append("g")
    .attr("class", "bar-center-value")
    .append("rect")
    .attr("width", "40")
    .attr("height", "20")
    .attr("fill", "black");

  return toolTip;
};
