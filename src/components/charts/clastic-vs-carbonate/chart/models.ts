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

export type DataModel =
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
    };

export type ChartData = DataModel[];

export interface ClasticVsCarbonateChart {
  updateData: (newData: ChartData) => void;
}
