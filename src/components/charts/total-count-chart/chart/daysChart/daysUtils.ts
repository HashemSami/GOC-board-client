import { DaysDataModel } from "../models";
import { generateCountTipChart } from "../tips/CountTips";
import { generateDaysChart } from "../daysChart";
import { ChartOptions } from "../models";
import { chartColors } from "../../../../../styles/colors";

interface BarGeneratorProp {
  rects: d3.Selection<d3.BaseType, DaysDataModel, SVGGElement, unknown>;
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number, never>;
  options: {
    height: number;
    width: number;
    midPoint: number;
    tip: d3.Selection<SVGGElement, unknown, null, undefined>;
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
    .attr("x1", width / 2)
    .attr("x2", width / 2)
    .attr("y1", 0)
    .attr("y2", height);
};

// generates the count bars with the value tables
export const countBarsGenerator = (
  props: BarGeneratorProp,
  chartOptions: ChartOptions,
  chartSvg: d3.Selection<SVGSVGElement, unknown, null, undefined>
) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint, svg } = options;

  // generating tip component
  const [tipGroup, updateData] = generateCountTipChart(tip, width, height);

  // const daysChart = generateDaysChart(svg, chartOptions);

  rects
    .enter()
    .append("circle")
    .on("mousemove", (e, d) => {
      // e.target.style.stroke = "white";
      const xVal = e.target.cx.baseVal.value;
      const yVal = e.target.cy.baseVal.value;
      updateData(xVal, yVal, d);
    })
    .on("mouseout", (e, d) => {
      // e.target.style.stroke = "none";
      tipGroup.transition().duration(50).attr("height", 0).attr("width", 0);
    })
    .on("click", (e, d) => {
      // e.target.style.stroke = "yellow";
      chartSvg.transition().duration(300).attr("height", 0).attr("width", 0);
      // tipGroup.transition().duration(50).attr("height", 0).attr("width", 0);
    })
    .attr("cx", (data, i) => {
      const xVal = x(data.dayNumber);
      return xVal ? xVal + midPoint : null;
    })
    .attr("r", 7)
    .attr("fill", chartColors.countCir)
    .attr("stroke", chartColors.countCirStroke)
    .attr("cy", height)
    .style("opacity", 0)
    .transition()
    .duration(500)
    .style("opacity", 1)
    .attr("cy", (d) => y(d.count))
    .each((data, i) => {
      // generateValuesTable(svg, width, height, i, data, x);
    });
};

export const tgfBarGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint } = options;

  const barWidth = x.bandwidth();
  const tipTool = tip.append("text");
  rects
    .enter()
    .append("rect")
    // .on("mousemove", (e, d) => {
    //   e.target.style.stroke = "white";
    //   tipTool.attr("x", e.target.x.baseVal.value + midPoint);
    //   tipTool.attr("y", e.target.y.baseVal.value);
    //   tipTool.text(`${d.tgf}`);
    // })
    // .on("mouseout", (e, d) => {
    //   e.target.style.stroke = "black";
    //   tipTool.text("");
    // })
    .attr("x", (data, i) => {
      // const xVal = x(data.name);
      const xVal = x(data.dayNumber);
      return xVal ? xVal : null;
    })
    .attr("width", barWidth)
    .attr("fill", "url(#tgfPattern)")
    .attr("stroke", chartColors.footageStroke)
    .attr("class", "tgf-bar")
    .attr("rx", 170)
    .attr("ry", 8)
    .attr("y", height)
    .transition()
    .duration(1000)
    .attr("y", (d) => y(d.tgf))
    .attr("height", (d) => height - y(d.tgf));
};

export const trfBarGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint } = options;

  const barWidth = x.bandwidth();

  const tipTool = tip.append("text");
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
    .attr("x", (data, i) => {
      // const xVal = x(data.name);
      const xVal = x(data.dayNumber);
      return xVal ? xVal : null;
    })
    .attr("width", barWidth)
    .attr("fill", (d) =>
      d.trf < d.tgf / 2 ? chartColors.trfLow : chartColors.trf
    )
    .attr("stroke", chartColors.footageStroke)
    .attr("class", "trf-bar")
    .attr("rx", 170)
    .attr("ry", 8)
    .attr("y", height)
    .transition()
    .duration(1400)
    .attr("y", (d) => y(d.trf))
    .attr("height", (d) => height - y(d.trf));
};

export const kpiGenerator = (props: BarGeneratorProp) => {
  const { rects, x, y, options } = props;
  const { height, width, tip, midPoint, svg } = options;

  rects
    .enter()
    .append("rect")
    .attr("x", (data, i) => {
      // const xVal = x(data.name);
      const xVal = (width / 2) * i + 15;
      return xVal ? xVal : null;
    })

    .attr("fill", (d) => (d.kpi < 50 ? chartColors.kpiLow : chartColors.kpi))
    .attr("stroke", "white")
    .attr("class", "trf-bar")
    // .attr("rx", 10)
    .attr("y", height)
    .attr("y", 5)
    .attr("height", 15)
    .transition()
    .duration(800)
    .attr("width", (d) => {
      const xVal = y(d.kpi);
      return xVal ? xVal : null;
    })
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
        .attr("fill", chartColors.kpiBack)
        // burlywood
        .attr("y", 5);
    });
};
