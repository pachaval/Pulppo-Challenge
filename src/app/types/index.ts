export type GroupListing = { casaPrices: number[]; deptPrices: number[] };

export const COLORS: Record<string, string> = {
  Departamento: "#00C49F",
  Casa: "#0088FE",
};

export type ChartData = {
  Departamento?: number;
  roofedSurface: number;
  Casa?: number;
};

export type Listing = {
  avgPricePerMeter: number;
  roofedSurface: number;
  price: number;
  type: string;
};
