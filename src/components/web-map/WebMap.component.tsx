import { FC, useEffect, useRef, useState } from "react";
import { DynamicChartContainer } from "./WebMap.styles";

import { ChartProps } from "../../models";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  width: number;
  height: number;
}

const WebMap: FC<ChartProps> = ({ width, height, updateFunction }) => {
  const chartDiv = useRef<HTMLDivElement | null>(null);

  const [barC, setBarC] = useState<any>();

  useEffect(() => {
    if (!chartDiv.current) {
      return;
    }
    const initialState = {
      lng: 46,
      lat: 24,
      zoom: 7,
    };

    const map = L.map(chartDiv.current).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    // Tile type: openstreetmap normal
    const openstreetmap = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
      }
    );

    // Tile type: openstreetmap Hot
    const openstreetmapHot = L.tileLayer(
      "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
      }
    );

    // Tile type: openstreetmap Osm
    const openstreetmapOsm = L.tileLayer(
      "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
      }
    );

    //Base layers definition and addition
    const allOptions = {
      "Open streetmap": openstreetmap,
      "Open streetmap: Hot": openstreetmapHot,
      "Open streetmap: Osm": openstreetmapOsm,
    };

    // Initialize with openstreetmap
    openstreetmap.addTo(map);

    // Add baseLayers to map as control layers
    L.control.layers(allOptions).addTo(map);
  }, []);

  return (
    <DynamicChartContainer ref={chartDiv} width={width} height={height}>
      <div ref={chartDiv}></div>
    </DynamicChartContainer>
  );
};

export default WebMap;
