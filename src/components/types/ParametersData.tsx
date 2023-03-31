export interface ParametersData {
  startQuarter: string;
  endQuarter: string;
  chartPoints: {
    quarterRange: string;
    price: number;
  }[];
  houseType: string;
  comment: string;
}
