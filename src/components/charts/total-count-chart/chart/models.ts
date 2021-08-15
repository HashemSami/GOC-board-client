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

export type DivisionName = {
  NARCD: {
    name: "NARCD";
    count: number;
    tgf: number;
    trf: number;
    kpi: number;
  };
  SARCD: {
    name: "SARCD";
    count: number;
    tgf: number;
    trf: number;
    kpi: number;
  };
  GRCD: { name: "GRCD"; count: number; tgf: number; trf: number; kpi: number };
};

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

export interface DaysDataModel {
  dateString: string;
  dayNumber: string;
  jsDate: Date;
  monthName: string;
  monthNumber: number;
  year: number;
  divisions: DivisionName;
  count: number;
  tgf: number;
  trf: number;
  kpi: number;
}

export type DaysChartData = DaysDataModel[];
