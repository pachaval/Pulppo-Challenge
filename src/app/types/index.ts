export type GroupListing = { casaPrices: number[]; deptPrices: number[] };

export const COLORS: Record<string, string> = {
  Departamento: "#00C49F",
  Casa: "#0088FE",
};

export type ChartData = {
  roofedSurface: number;
  Casa?: number;
  Departamento?: number;
};

export type Listing = {
  type: string;
  roofedSurface: number;
  price: number;
};
