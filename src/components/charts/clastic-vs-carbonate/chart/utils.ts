import { generateCenterBarValue } from "../../../tooltips/chartsToolTips/valueTips";
import { linearScale } from "../../../../services/d3";
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
    .attr("stroke", "white")
    .transition()
    .duration(350)
    .attr("x1", width / 2)
    .attr("x2", width / 2)
    .attr("y1", 0)
    .attr("y2", height);
};

// generates the count bars with the value tables
export const countBarsGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint, svg } = options;

  const ytable = linearScale([0, height], [0, height]);
  rects
    .enter()
    .append("rect")
    .on("mousemove", (e, d) => {
      e.target.style.stroke = "white";
      tip.attr("x", e.target.x.baseVal.value + midPoint);
      tip.attr("y", e.target.y.baseVal.value);
      e.target.className.baseVal === "count-bar"
        ? tip.text(`${d.count}`)
        : tip.text("");
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
    .attr("fill", (d) => {
      return d.name === "carbonate"
        ? "url(#carbonatePattern)"
        : "url(#clasticPattern)";
    })
    .attr("stroke", "black")
    .attr("class", "count-bar")
    .attr("y", height)
    .transition()
    .duration(500)
    .attr("y", (d) => y(d.count))
    .attr("height", (d) => height - y(d.count))
    .each((data, i) => {
      generateValuesTable(svg, width, height, i, data);
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
      e.target.className.baseVal === "tgf-bar"
        ? tip.text(`${d.tgf}`)
        : tip.text("");
    })
    .on("mouseout", (e, d) => {
      e.target.style.stroke = "black";
      tip.text("");
    })
    .attr("x", (data, i) => {
      // const xVal = x(data.name);
      const xVal = (width / 2) * i + 15;
      return xVal ? xVal : null;
    })
    .attr("width", width / 2 - 30)
    .attr("fill", "url(#tgfPattern)")
    .attr("stroke", "black")
    .attr("class", "tgf-bar")
    .attr("rx", 10)
    .attr("y", height)
    .transition()
    .duration(500)
    .attr("y", (d) => y(d.tgf))
    .attr("height", (d) => height - y(d.tgf));
};

export const trfBarGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint } = options;

  rects
    .enter()
    .append("rect")
    .on("mousemove", (e, d) => {
      e.target.style.stroke = "white";
      tip.attr("x", e.target.x.baseVal.value + midPoint);
      tip.attr("y", e.target.y.baseVal.value);
      e.target.className.baseVal === "trf-bar"
        ? tip.text(`${d.trf}`)
        : tip.text("");
    })
    .on("mouseout", (e, d) => {
      e.target.style.stroke = "black";
      tip.text("");
    })
    .attr("x", (data, i) => {
      // const xVal = x(data.name);
      const xVal = (width / 2) * i + 15;
      return xVal ? xVal : null;
    })
    .attr("width", width / 2 - 30)
    .attr("fill", (d) => (d.trf < d.tgf / 2 ? "red" : "rgba(58, 131, 34, 0.7)"))
    .attr("stroke", "black")
    .attr("class", "trf-bar")
    .attr("rx", 10)
    .attr("y", height)
    .transition()
    .duration(800)
    .attr("y", (d) => y(d.trf))
    .attr("height", (d) => height - y(d.trf));
};

export const kpiGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint, svg } = options;

  rects
    .enter()
    .append("rect")
    .on("mousemove", (e, d) => {
      e.target.style.stroke = "white";
      tip.attr("x", e.target.x.baseVal.value + midPoint);
      tip.attr("y", e.target.y.baseVal.value);
      e.target.className.baseVal === "trf-bar"
        ? tip.text(`${d.trf}`)
        : tip.text("");
    })
    .on("mouseout", (e, d) => {
      e.target.style.stroke = "black";
      tip.text("");
    })
    .attr("x", (data, i) => {
      // const xVal = x(data.name);
      const xVal = (width / 2) * i + 15;
      return xVal ? xVal : null;
    })
    .attr("width", (d) => {
      const xVal = y(d.kpi);
      return xVal ? xVal : null;
    })
    .attr("fill", (d) => (d.kpi < 50 ? "red" : "rgba(58, 131, 34, 0.7)"))
    .attr("stroke", "white")
    .attr("class", "trf-bar")
    // .attr("rx", 10)
    .attr("y", height)
    .transition()
    .duration(800)
    .attr("y", 5)
    .attr("height", 15)
    .each((d, i) => {
      const xVal = (width / 2) * i;

      svg
        .append("text")
        .attr("x", xVal + 15)
        .attr("style", "font-size:0.7em")
        .text(`KPI: ${d.kpi} %`);

      svg
        .append("rect")
        // .attr("transform", `translate(0, ${5})`)
        .attr("width", width / 2 - 30)
        .attr("height", 15)
        // .attr("stroke", "white")
        .attr("x", xVal + 15)
        .attr("fill", "darkgray")
        // burlywood
        .attr("y", 5);
    });
};

const generateValuesTable = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  width: number,
  height: number,
  i: number,
  data:
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
      }
) => {
  const valueTable = svg.append("g").attr("class", "value-table");
  const xVal = (width / 2) * i;
  const yVal = 90;
  const offset = 20;
  const rectHeight = 20;
  const fontSize = "0.8em";
  console.log(yVal);

  valueTable
    .append("rect")
    .attr("width", width / 2)
    .attr("height", yVal)
    .attr("transform", `translate(0, ${5})`)
    .attr("fill", "lightslategray")
    .attr("stroke", "white")
    .attr("x", xVal)
    .attr("y", height);

  // title rect
  valueTable
    .append("rect")
    .attr("transform", `translate(0, ${5})`)
    .attr("width", width / 2)
    .attr("height", 20)
    .attr("stroke", "white")
    .attr("x", xVal)
    .attr("fill", "brown")
    .attr("y", height);

  valueTable
    .append("text")
    .style("font-size", fontSize)
    .attr("transform", `translate(0, ${rectHeight})`)
    .attr("text-anchor", "middle")
    .attr("x", xVal + width / 4)
    // .attr("style", "fill:white;")
    .attr("y", height)
    .text(`${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`);

  // count rect
  valueTable
    .append("rect")
    .attr("transform", `translate(0, ${rectHeight * 2 - 10})`)
    .attr("width", 20)
    .attr("height", 10)
    .attr("stroke", "black")
    .attr("x", xVal + 20)
    .attr(
      "fill",
      data.name === "carbonate"
        ? "url(#carbonatePattern)"
        : "url(#clasticPattern)"
    )
    .attr("y", height);

  // TGF rect
  valueTable
    .append("rect")
    .attr("transform", `translate(0, ${rectHeight * 3 - 10})`)
    .attr("width", 20)
    .attr("height", 10)
    .attr("x", xVal + 20)
    .attr("stroke", "black")
    .attr("fill", "url(#tgfPattern)")
    .attr("y", height);

  // TRF rect
  valueTable
    .append("rect")
    .attr("transform", `translate(0, ${rectHeight * 4 - 10})`)
    .attr("width", 20)
    .attr("height", 10)
    .attr("x", xVal + 20)
    .attr("stroke", "black")
    .attr("fill", "rgba(58, 131, 34, 0.7)")
    .attr("y", height);

  valueTable
    .append("text")
    .style("font-size", fontSize)
    .attr("transform", `translate(0, ${rectHeight * 2})`)
    .attr("text-anchor", "middle")
    .attr("x", xVal + width / 4)
    // .attr("style", "fill:white;")
    .attr("y", height)
    .text(`Well count : ${data.count} wells`);

  valueTable
    .append("text")
    .style("font-size", fontSize)
    .attr("transform", `translate(0, ${rectHeight * 3})`)
    .attr("text-anchor", "middle")
    .attr("x", xVal + width / 4)
    // .attr("style", "fill:black;")
    .attr("y", height)
    .text(`TGF : ${data.tgf} ft`);

  valueTable
    .append("text")
    .style("font-size", fontSize)
    .attr("transform", `translate(0, ${rectHeight * 4})`)
    .attr("text-anchor", "middle")
    .attr("x", xVal + width / 4)
    // .attr("style", "fill:black;")
    .attr("y", height)
    .text(`TRF : ${data.trf} ft`);
};
