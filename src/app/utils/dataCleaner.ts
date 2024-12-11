// Jugando con los gráficos note que habia datos muy extremos que hacian que la
// visualización gráfica pierda efectividad. Para los própositos del ejercicio
// cree esta funcion para calcular el precio medio por metro cuadrado, y eliminar
// de la lista todas las propiedades cuyo precio por metro cuadrado se aleje
// del 50% mas o menos de la media. Creo que esta decisión hace que podamos
// enfocarnos en los datos comunes de la ciudad, pudiendo asi tomar conclusiones
// mas certeras, evitando ver casos extremos de propiedades "fuera de lo comun"

export default function removeUnusualData(listings: any) {
  listings.forEach((listing: any) => {
    listing.avgPricePerMeter = Math.round(
      listing.price / listing.roofedSurface
    );
  });

  const totalPricePerMeter = listings.reduce(
    (sum: any, listing: any) => sum + (listing.avgPricePerMeter || 0),
    0
  );
  const avgPricePerMeter = Math.round(totalPricePerMeter / listings.length);

  const lowerBound = avgPricePerMeter * 0.5;
  const upperBound = avgPricePerMeter * 1.5;

  const filteredHouses = listings.filter(
    (house: any) =>
      house.avgPricePerMeter! >= lowerBound &&
      house.avgPricePerMeter! <= upperBound
  );

  return filteredHouses;
}

// Hay algunos casos como el de Irapuato, donde el precio por metro de una casa es de $44
// mientras que hay otra casa donde el precio es $19.000.
// Esta solucion excluye a esas ciudades por razones de integridad de datos.
