export const generateValueTip = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  offset: number
) => {
  const toolTip = svg
    .append("g")
    .attr("class", "value-tip")
    .append("text")
    .attr("transform", `translate(0, ${offset})`)
    .attr("text-anchor", "middle");

  return toolTip;
};
