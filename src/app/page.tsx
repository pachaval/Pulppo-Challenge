import React from "react";

import SearchableDropdown from "./components/SearchDropdown";
import ChartContainer from "./components/ChartContainer";
import { fetchCities } from "@/lib/cities";

const CitiesPage = async () => {
  const cities = await fetchCities();

  return (
    <div className="flex-col items-center">
      <SearchableDropdown options={cities} />
      <ChartContainer />
    </div>
  );
};

export default CitiesPage;
