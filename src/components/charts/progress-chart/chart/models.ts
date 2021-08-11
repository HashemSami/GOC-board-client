export interface ChartOptions {
  height: number;
  width: number;
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface DataModel {
  name: "GOC" | "NFCD" | "SARCD" | "GRCD";
  count: number;
  tgf: number;
  trf: number;
  kpi: number;
  target: number;
}

export type ChartData = DataModel[];

export interface ClasticVsCarbonateChart {
  updateData: (newData: ChartData) => void;
}
