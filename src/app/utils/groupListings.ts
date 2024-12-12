import { GroupListing, Listing } from "../types";

// La idea aca es separar los departamentos de las casas
// para poder agruparlos visualmente y diferenciarlos

export default function groupListings(listings: Listing[]) {
  const grouped: Record<number, GroupListing> = {};

  listings.forEach((listing) => {
    const { roofedSurface, price, type } = listing;
    if (!grouped[roofedSurface]) {
      grouped[roofedSurface] = { casaPrices: [], deptPrices: [] };
    }
    if (type === "Casa") {
      grouped[roofedSurface].casaPrices.push(price);
    } else if (type === "Departamento") {
      grouped[roofedSurface].deptPrices.push(price);
    }
  });

  const chartData = Object.entries(grouped)
    .map(([surfaceStr, { casaPrices, deptPrices }]) => {
      const roofedSurface = Number(surfaceStr);
      const casaAvg =
        casaPrices.length > 0
          ? casaPrices.reduce((sum, val) => sum + val, 0) / casaPrices.length
          : undefined;
      const deptAvg =
        deptPrices.length > 0
          ? deptPrices.reduce((sum, val) => sum + val, 0) / deptPrices.length
          : undefined;

      return {
        roofedSurface,
        Casa: casaAvg,
        Departamento: deptAvg,
      };
    })
    .sort((a, b) => a.roofedSurface - b.roofedSurface);

  return chartData;
}
