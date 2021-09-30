interface SeriesDataPoint {
  date: Date;
  value: number;
}

export type SeriesData = SeriesDataPoint[];

interface ChartDataPoint {
  date: Date;
  values: {
    [key: string]: number;
  };
}

export type ChartData = ChartDataPoint[];
