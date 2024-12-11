import React from "react";
import { fetchCities } from "@/lib/cities";
import SearchableDropdown from "../components/SearchDropdown";
import CityPieChart from "../components/CityPieChart";
import CityBarChart from "../components/CityBarChart";

const CitiesPage = async () => {
  const cities = await fetchCities();

  return (
    <div className="flex-col items-center">
      <SearchableDropdown options={cities} />
      <div className="flex h-full">
        <CityPieChart />
        <CityBarChart />
      </div>
    </div>
  );
};

export default CitiesPage;
