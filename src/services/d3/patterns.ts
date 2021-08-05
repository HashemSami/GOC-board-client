import v from "../../icons/rock2.png";

export const generateTgfPattern = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>
) => {
  const tgfPattern = svg
    .append("g")
    .append("defs")
    .append("pattern")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("id", "tgfPattern")
    .attr("width", "1000")
    .attr("height", "900");
  tgfPattern
    .append("image")
    .attr("href", `${v}`)
    .attr("x", "0")
    .attr("y", "0")
    .attr("style", "background-size: 100% 100%; width:auto; height:auto;");
};

export const generateCabonateAndClasticPattern = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>
) => {
  const carbonatePattern = svg
    .append("g")
    .append("defs")
    .append("pattern")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("id", "carbonatePattern")
    .attr("x", "10")
    .attr("y", "0")
    .attr("width", "92")
    .attr("height", "32");

  const mainRect = carbonatePattern
    .append("rect")
    .attr("fill", "#FF76C8")
    .attr("width", "93")
    .attr("height", "33");
  // .attr("stroke", "black");

  carbonatePattern
    .append("rect")
    .attr("x", "0.5")
    .attr("y", "0.5")
    .attr("width", "46")
    .attr("height", "16")
    .attr("fill", "none")
    .attr("stroke", "black");
  carbonatePattern
    .append("rect")
    .attr("x", "23.5")
    .attr("y", "16.5")
    .attr("width", "46")
    .attr("height", "16")
    .attr("fill", "none")
    .attr("stroke", "black");
  // carbonatePattern
  //   .append("rect")
  //   .attr("x", "0.5")
  //   .attr("y", "32.5")
  //   .attr("width", "46")
  //   .attr("height", "16")
  //   .attr("fill", "none")
  //   .attr("stroke", "black");
  // carbonatePattern
  //   .append("rect")
  //   .attr("x", "46.5")
  //   .attr("y", "32.5")
  //   .attr("width", "46")
  //   .attr("height", "16")
  //   .attr("fill", "none")
  //   .attr("stroke", "black");
  carbonatePattern
    .append("rect")
    .attr("x", "46.5")
    .attr("y", "0.5")
    .attr("width", "46")
    .attr("height", "16")
    .attr("fill", "none")
    .attr("stroke", "black");

  const clasticPattern = svg
    .append("g")
    .append("defs")
    .append("pattern")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("id", "clasticPattern")
    .attr("x", "0")
    .attr("y", "0")
    .attr("width", "8")
    .attr("height", "8");

  clasticPattern
    .append("rect")
    .attr("fill", "yellow")
    .attr("width", "8")
    .attr("height", "8");

  clasticPattern
    .append("circle")
    .attr("cx", "8")
    .attr("cy", "8")
    .attr("r", "2")
    .attr("style", "stroke: none; fill: #000000;");
};
