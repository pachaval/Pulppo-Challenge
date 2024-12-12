// Esta funcion me devuelve por cada tipo (casa, departamento), la media
// del precio por metro cuadrado de la ciudad en cuestion

import { Listing } from "../types";

export default function calculateAveragePricePerMeterByType(
  listings: Listing[]
) {
  const typeData: { [key: string]: { total: number; count: number } } = {};

  listings.forEach((listing: Listing) => {
    const { type, avgPricePerMeter } = listing;

    if (!typeData[type]) {
      typeData[type] = { total: 0, count: 0 };
    }

    typeData[type].total += avgPricePerMeter;
    typeData[type].count += 1;
  });

  const averages: { [key: string]: number } = {};
  for (const type in typeData) {
    averages[type] = typeData[type].total / typeData[type].count;
  }

  return averages;
}
