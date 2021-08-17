import { generateBitIcon } from "../../../../services/d3/bitD3";
import { DataModel } from "./models";
import { chartColors } from "../../../../styles/colors";
import { linearScale } from "../../../../services/d3";
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

  svg.attr("style", "font-size:0.9em;font-weight: bold;").attr("fill", "white");
  rects
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("fill", "rgb(91, 91, 91)")
    .attr("stroke", "black")
    .attr("class", "progress-bar")
    // .attr("rx", 10)
    // .attr("y", height)
    .attr("y", y)
    .attr("height", progressHight)
    .transition()
    .duration(800)
    .attr("width", d => {
      const xVal = x(d.count);
      return xVal ? xVal : null;
    })
    .each((d, i) => {
      // counting text

      generateProgressText(svg, x, height, width, d);

      // add bit icon
      bit
        .select("svg")
        .attr("class", "bit-icon")
        .attr("y", y - 12)
        .transition()
        .duration(800)
        .attr("x", x(d.count) - 18);
    });
};

export const tgfBarGenerator = (props: BarGeneratorProp) => {
  const { rects, x, options } = props;
  const { height, width } = options;

  const y = height / 2;

  rects
    .enter()
    .append("rect")
    // .on("mousemove", (e, d) => {
    //   const xVal = e.target.x.baseVal.value;
    //   const yVal = e.target.y.baseVal.value;
    //   updateData(xVal, yVal, d);
    // })
    // .on("mouseout", (e, d) => {
    //   // e.target.style.stroke = "none";
    //   tipGroup.transition().duration(50).attr("height", 0).attr("width", 0);
    // })
    .attr("x", 0)

    .attr("fill", "url(#tgfPattern)")
    .attr("stroke", "black")
    .attr("class", "tgf-bar")
    .attr("ry", 170)
    .attr("rx", 8)
    .attr("y", y - 20)
    .attr("height", 50)

    .transition()
    .duration(900)
    .attr("width", d => x(d.tgf));
};

export const trfBarGenerator = (props: BarGeneratorProp) => {
  const { rects, x, options } = props;
  const { height, width, svg } = options;
  const y = height / 2;

  rects
    .enter()
    .append("rect")
    // .on("mousemove", (e, d) => {
    //   e.target.style.stroke = "white";
    //   tipTool.attr("x", e.target.x.baseVal.value + midPoint);
    //   tipTool.attr("y", e.target.y.baseVal.value);
    //   tipTool.text(`${d.trf}`);
    // })
    // .on("mouseout", (e, d) => {
    //   e.target.style.stroke = "black";
    //   tipTool.text("");
    // })
    .attr("x", 0)
    .attr("fill", d =>
      d.trf < d.tgf / 2 ? chartColors.trfLow : chartColors.trf
    )
    .attr("stroke", "black")
    .attr("class", "trf-bar")
    .attr("ry", 170)
    .attr("rx", 8)
    .attr("y", y - 20)
    .attr("height", 50)
    .transition()
    .duration(1400)
    .attr("width", d => x(d.trf));
};

const generateProgressText = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  x: d3.ScaleLinear<number, number, never>,
  height: number,
  width: number,
  d: DataModel
) => {
  const y = height / 2;
  const xKpi = linearScale([0, 100], [0, 160]);
  // kpi rect
  svg
    .append("text")
    .attr("x", x(d.target) / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("style", "font-weight: bold;stroke:black;stroke-width: 0.4;")
    .text(`Total KPI`);

  svg
    .append("rect")
    .attr("fill", "darkgrey")
    // .attr("stroke", "white")
    .attr("stroke-width", "2")
    .attr("x", x(d.target) / 2 - 80)
    .attr("y", 45)
    .attr("rx", 8)
    .attr("width", 160)
    .attr("height", 15);

  svg
    .append("rect")
    .attr("fill", "red")
    .attr("stroke", "white")
    // .attr("stroke-width", "2")
    .attr("x", x(d.target) / 2 - 80)
    .attr("y", 45)
    .attr("rx", 8)
    .attr("width", xKpi((d.trf / d.tgf) * 100))
    .attr("height", 15);

  svg
    .append("text")
    .attr("x", x(d.target) / 2)
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .attr("style", "font-weight: bold;stroke:black;stroke-width: 0.4;")
    .text(`${(d.trf / d.tgf) * 100} %`);

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", y + 40)
    .attr("rx", 8)
    .attr("width", x(d.target))
    .attr("height", 60)
    .attr("style", "fill: darkslategray;stroke: white;stroke-width: 2;");
  // count text
  svg
    .append("text")
    .attr("x", x(d.target) / 6)
    .attr("y", y + 65)
    .attr("text-anchor", "middle")
    .attr("style", "font-weight: bold;stroke:black;stroke-width: 0.4;")
    .text(`Total Count`);
  svg
    .append("text")
    .attr("x", x(d.target) / 6)
    .attr("y", y + 85)
    .attr("text-anchor", "middle")
    .attr("style", "font-weight: bold;stroke:black;stroke-width: 0.4;")
    .text(`${d.count} wells`);

  // tgf text
  svg
    .append("text")
    .attr("x", x(d.target) / 2)
    .attr("y", y + 65)
    .attr("text-anchor", "middle")
    .text(`TGF`)
    .attr("style", "font-weight: bold;stroke:black;stroke-width: 0.4;");
  svg
    .append("text")
    .attr("x", x(d.target) / 2)
    .attr("y", y + 85)
    .attr("text-anchor", "middle")
    .text(`${d.tgf} ft`)
    .attr("style", "font-weight: bold;stroke:black;stroke-width: 0.4;");

  // trf text
  svg
    .append("text")
    .attr("x", x(d.target) / 1.2)
    .attr("y", y + 65)
    .attr("text-anchor", "middle")
    .text(`TRF`)
    .attr("style", "font-weight: bold;stroke:black;stroke-width: 0.4;");
  svg
    .append("text")
    .attr("x", x(d.target) / 1.2)
    .attr("y", y + 85)
    .attr("text-anchor", "middle")
    .text(`${d.trf} ft`)
    .attr("style", "font-weight: bold;stroke:black;stroke-width: 0.4;");

  // target text
  svg
    .append("rect")
    .attr("fill", "chocolate")
    .attr("stroke", "white")
    .attr("stroke-width", "2")
    .attr("x", x(d.target) - 60 * 2)
    .attr("y", 0)
    .attr("rx", 8)
    .attr("width", 60 * 2)
    .attr("height", 65);
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", x(d.target) - 60)
    .attr("y", 25)
    // .attr("fill", "red")
    .attr(
      "style",
      "font-size: larger;font-family: fantasy;fill: darkred;stroke:orange;stroke-width: 1;"
    )
    .text(`TARGET`);
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", x(d.target) - 60)
    .attr("y", 55)
    .attr(
      "style",
      "font-size: larger;font-family: fantasy;fill: white;stroke:brown;stroke-width: 0.9;"
    )
    .text(`${d.target} wells`);

  // percent text
  svg
    .append("rect")
    .attr("fill", "forestgreen")
    .attr("stroke", "white")
    .attr("stroke-width", "2")
    .attr("x", 0)
    .attr("y", 0)
    .attr("rx", 8)
    // .attr("ry", 210)
    .attr("width", 60 * 2)
    .attr("height", 65);
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", 60)
    .attr("y", 25)
    .attr(
      "style",
      "font-size: larger;font-family: fantasy;fill: darkorange;stroke:black;stroke-width: 0.9;"
    )
    .text(`COMPLETED`);
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", 60)
    .attr(
      "style",
      "font-size: larger;font-family: fantasy;fill: white;stroke:black;stroke-width: 1;"
    )
    .attr("y", 55)
    .text(`${d.kpi} %`);

  // add target rect
  svg
    .append("rect")
    // .attr("transform", `translate(0, ${5})`)
    .attr("width", x(d.target))
    .attr("height", 50)
    .attr("class", "target")
    .attr("ry", 170)
    .attr("rx", 8)
    // .attr("stroke", "white")
    .attr("x", 0)
    .attr("fill", "darkgray")
    // burlywood
    .attr("y", y - 20);
};
