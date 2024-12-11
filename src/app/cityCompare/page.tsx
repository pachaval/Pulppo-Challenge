import React from "react";
import { fetchCities } from "@/lib/cities";

const CitiesPage = async () => {
  const cities = await fetchCities();

  return (
    <div className="flex-col items-center">
      <div className="flex h-full"></div>
    </div>
  );
};

export default CitiesPage;
