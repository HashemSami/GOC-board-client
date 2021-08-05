import { generateCenterBarValue } from "../../../tooltips/chartsToolTips/valueTips";
interface BarGeneratorProp {
  rects: d3.Selection<
    d3.BaseType,
    | {
        name: "clastic";
        count: number;
        tgf: number;
        trf: number;
        kpi: number;
      }
    | {
        name: "carbonate";
        count: number;
        tgf: number;
        trf: number;
        kpi: number;
      },
    SVGGElement,
    unknown
  >;
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number, never>;
  options: {
    height: number;
    width: number;
    midPoint: number;
    tip: d3.Selection<SVGTextElement, unknown, null, undefined>;
    svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  };
}

export const drawCenterLine = (
  centerLine: d3.Selection<SVGLineElement, unknown, null, undefined>,
  width: number,
  height: number
) => {
  centerLine
    .style("fill", "transparent")
    .style("stroke-width", "2")
    .attr("stroke", "black")
    .transition()
    .duration(350)
    .attr("x1", width / 2)
    .attr("x2", width / 2)
    .attr("y1", 0)
    .attr("y2", height);
};

export const countBarsGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint, svg } = options;

  rects
    .enter()
    .append("rect")
    .on("mousemove", (e, d) => {
      e.target.style.stroke = "white";
      tip.attr("x", e.target.x.baseVal.value + midPoint);
      tip.attr("y", e.target.y.baseVal.value);
      tip.text(`${d.name}`);
    })
    .on("mouseout", (e, d) => {
      e.target.style.stroke = "black";
      tip.text("");
    })
    .attr("x", (data, i) => {
      const xVal = x(data.name);
      return xVal ? xVal : null;
    })
    .attr("width", x.bandwidth())
    .attr("fill", d => {
      return d.name === "carbonate"
        ? "url(#carbonatePattern)"
        : "url(#clasticPattern)";
    })
    .attr("stroke", "black")
    .attr("y", height)
    .transition()
    .duration(500)
    .attr("y", d => y(d.count))
    .attr("height", d => height - y(d.count))
    .each(data => {
      const barValue = svg.append("g").attr("class", "bar-center-value");
      const xVal = x(data.name);
      const offset = 20;
      const rectHeight = 30;
      const valueRect = barValue
        .append("rect")
        .attr("width", x.bandwidth() - offset)
        .attr("height", rectHeight)
        .attr("transform", `translate(0, ${-rectHeight})`)
        .attr("fill", "white")

        .attr("x", xVal ? xVal + offset / 2 : 0)
        .attr("y", height);
      const text = barValue
        .append("text")
        .style("font-size", "1em")
        .attr("transform", `translate(0, ${-rectHeight / 3})`)
        .attr("text-anchor", "middle")
        .attr("x", xVal ? xVal + midPoint : 0)
        .attr("style", "fill:black;")
        .attr("y", height)
        .text(`${data.count} wells`);
    });
};

export const tgfBarGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint } = options;

  rects
    .enter()
    .append("rect")
    .on("mousemove", (e, d) => {
      e.target.style.stroke = "white";
      tip.attr("x", e.target.x.baseVal.value + midPoint);
      tip.attr("y", e.target.y.baseVal.value);
      tip.text(`${d.name}`);
    })
    .on("mouseout", (e, d) => {
      e.target.style.stroke = "black";
      tip.text("");
    })
    .attr("x", (data, i) => {
      // const xVal = x(data.name);
      const xVal = (width / 2) * i + 5;
      return xVal ? xVal : null;
    })
    .attr("width", width / 2 - 10)
    .attr("fill", "url(#tgfPattern)")
    .attr("stroke", "black")
    .attr("y", height)
    .transition()
    .duration(500)
    .attr("y", d => y(d.tgf))
    .attr("height", d => height - y(d.tgf));
};

export const trfBarGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint } = options;

  rects
    .enter()
    .append("rect")
    .on("mousemove", (e, d) => {
      e.target.style.fill = "yellow";
      tip.attr("x", e.target.x.baseVal.value + midPoint);
      tip.attr("y", e.target.y.baseVal.value);
      tip.text(`${d.name}`);
    })
    .on("mouseout", (e, d) => {
      e.target.style.fill = "rgb(58 131 34)";
      tip.text("");
    })
    .attr("x", (data, i) => {
      // const xVal = x(data.name);
      const xVal = (width / 2) * i + 5;
      return xVal ? xVal : null;
    })
    .attr("width", width / 2 - 10)
    .attr("fill", d => (d.trf < d.tgf / 2 ? "red" : "rgb(58 131 34)"))
    .attr("stroke", "black")
    .attr("y", height)
    .transition()
    .duration(800)
    .attr("y", d => y(d.trf))
    .attr("height", d => height - y(d.trf));
};
