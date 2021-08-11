import { generateBitIcon } from "../../../../services/d3/bitD3";
import { DataModel } from "./models";

interface BarGeneratorProp {
  rects: d3.Selection<d3.BaseType, DataModel, SVGGElement, unknown>;
  x: d3.ScaleLinear<number, number, never>;
  options: {
    height: number;
    width: number;
    svg: d3.Selection<SVGGElement, unknown, null, undefined>;
    bit: d3.Selection<SVGGElement, unknown, null, undefined>;
  };
}

export const progressBarGenerator = async (props: BarGeneratorProp) => {
  const { rects, x, options } = props;
  const { height, width, svg, bit } = options;
  const progressHight = 15;
  const y = height / 2;

  const bitIcon = await generateBitIcon();

  if (bit !== null) bit.node()?.append(bitIcon);

  rects
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("fill", "rgb(51, 51, 51)")
    .attr("stroke", "black")
    .attr("class", "progress-bar")
    // .attr("rx", 10)
    // .attr("y", height)
    .attr("y", y)
    .attr("height", progressHight)
    .transition()
    .duration(800)
    .attr("width", (d) => {
      const xVal = x(d.count);
      return xVal ? xVal : null;
    })
    .each((d, i) => {
      svg
        .append("text")
        .attr("x", 0)
        .attr("style", "font-size:0.7em")
        .text(`Total: ${d.count} wells`);

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", x(d.target))
        .attr("style", "font-size:0.7em")
        .text(`Target: ${d.target} wells`);

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", x(d.target) / 2)
        .attr("style", "font-size:0.7em")
        .text(`Target: ${d.kpi} %`);

      // add target rect
      svg
        .append("rect")
        // .attr("transform", `translate(0, ${5})`)
        .attr("width", x(d.target))
        .attr("height", progressHight)
        .attr("class", "target")

        // .attr("stroke", "white")
        .attr("x", 0)
        .attr("fill", "darkgray")
        // burlywood
        .attr("y", y);

      // add bit icon
      bit
        .select("svg")
        .attr("class", "bit-icon")
        .attr("y", y - 12)
        .transition()
        .duration(800)
        .attr("x", x(d.count) - 18);
      // bit
      //   .append("animateTransform")
      //   .attr("attributeName", "transform")
      //   .attr("type", "scale")
      //   .attr("values", "1 ; 1.07 ; 1")
      //   .attr("additive", "replace")
      //   .attr("repeatCount", "indefinite")
      //   .attr("dur", "1s")
      //   .attr("fill", "freeze")
      //   .attr("id", "anim");
    });
};
