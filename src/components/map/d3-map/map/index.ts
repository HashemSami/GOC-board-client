import {
  linearScale,
  bandScale,
  getMaxValue,
  generateBarXAxis,
  generateBarYAxis,
  getMinValue,
  geoGraticule,
  generateGeoPath,
} from "../../../../services/d3";
import { ChartOptions } from "../setup/models";
import * as topojson from "topojson-client";
import {
  GeometryObject,
  Topology,
  GeometryCollection,
} from "topojson-specification";
import world from "../../data/world-110m.topo.json";
import land from "../../data/land-110m.topo.json";

export const mapChart = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartOptions: ChartOptions
) => {
  const { width, height, margin } = chartOptions;

  svg.style("fill", "#BC9354");

  // generates axis labels
  const ChartTitle = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom / 2)
    .attr("text-anchor", "middle");

  const ChartLeftLabel = svg
    .append("text")
    .attr("x", -(height / 2))
    .attr("y", -(margin.left / 2))
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)");

  const xAxisSvg = svg.append("g").attr("transform", `translate(0, ${height})`);

  const yAxisSvg = svg.append("g");

  // =============================================================================
  // draw map

  const geoPath = generateGeoPath(width, height);

  const graticule = geoGraticule();

  const coo = topojson.mesh(
    world as unknown as Topology,
    world.objects.countries as GeometryObject,
    (a: GeometryObject, b: GeometryObject) => a !== b
  );

  console.log(coo.coordinates);
  svg
    .append("g")
    .append("path")
    .datum(
      topojson.feature(
        world as unknown as Topology,
        world.objects.land as GeometryObject
      )
    )
    .attr("class", "land")
    .attr("d", geoPath);

  svg
    .append("g")
    .append("path")
    .datum(
      topojson.mesh(
        world as unknown as Topology,
        world.objects.countries as GeometryObject,
        (a: GeometryObject, b: GeometryObject) => a !== b
      )
    )
    .attr("class", "boundary")
    .attr("d", geoPath);

  // svg
  //   .append("g")
  //   .append("path")
  //   .datum(graticule)
  //   .attr("class", "graticule")
  //   .attr("d", geoPath);

  return {
    updateData: (newData: { name: string; value: number }[]) => {
      ChartTitle.text("Bar Chart Title");
      ChartLeftLabel.text("Axis Title");
      // ------------------------------------------------------------
      // xAxis
      // will also do the scaling for the x values (the fields names)
      const x = bandScale(
        newData.map(d => d.name),
        [0, width]
      );
      x.padding(0.5);

      const xAxisCall = generateBarXAxis()(x);

      // xAxisSvg.call(xAxisCall);

      // ------------------------------------------------------------
      // yAxis
      const max = getMaxValue(newData);
      const min = getMinValue(newData);

      const y = linearScale(
        [min ? min * 0.95 : 0, max ? max + 10 : 1000],
        [height, 0]
      );

      const yAxisCall = generateBarYAxis()(y);

      // ------------------------------------------------------------
      // draw rects

      // DATA JOIN
      const rects = svg.selectAll("rect").data(newData);

      // EXIT
      rects
        .exit()
        .transition()
        .duration(500)
        .attr("y", height)
        .attr("height", 0)
        .remove();

      // UPDATE

      xAxisSvg.transition().duration(500).call(xAxisCall);
      yAxisSvg.transition().duration(500).call(yAxisCall);

      rects
        .transition()
        .duration(500)
        .attr("x", (data, i) => {
          const xVal = x(data.name);
          return xVal ? xVal : null;
        })
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value));

      // adding to the enter() phase
      // ENTER
      rects
        .enter()
        .append("rect")
        .attr("x", (data, i) => {
          const xVal = x(data.name);
          return xVal ? xVal : null;
        })
        .attr("width", x.bandwidth())
        .attr("fill", "red")
        .attr("y", height)
        .transition()
        .duration(500)
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value));
    },
  };
};
