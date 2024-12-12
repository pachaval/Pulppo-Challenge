import React from "react";

import SearchableDropdown from "./components/SearchDropdown";
import { fetchCities } from "@/lib/cities";
import ChartContainer from "./components/ChartContainer";

const CitiesPage = async () => {
  const cities = await fetchCities();

  return (
    <div className="flex-col items-center">
      <SearchableDropdown options={cities} />
      <ChartContainer cities={cities} />
    </div>
  );
};

export default CitiesPage;
