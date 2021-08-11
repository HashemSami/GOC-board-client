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

export type DivisionName = [
  { name: "NARCD"; count: number },
  { name: "SARCD"; count: number },
  { name: "GRCD"; count: number }
];

export interface DataModel {
  monthName: string;
  monthNumber: number;
  year: number;
  divisions: DivisionName;
  count: number;
  tgf: number;
  trf: number;
  kpi: number;
}

export type ChartData = DataModel[];

export interface ClasticVsCarbonateChart {
  updateData: (newData: ChartData) => void;
}
