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

export interface BarChart {
  updateData: (
    newData: {
      name: string;
      value: number;
    }[]
  ) => void;
}
