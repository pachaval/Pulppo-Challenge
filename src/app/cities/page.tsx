import React from "react";
import SearchableDropdown from "../components/SearchDropdown";
import CityPieChart from "../components/CityPieChart";
import Chart from "../components/Chart";
import { fetchCities } from "@/lib/cities";

const CitiesPage = async () => {
  const cities = await fetchCities();

  return (
    <div className="flex-col items-center">
      <SearchableDropdown options={cities} />
      <div className="flex h-full">
        <CityPieChart />
        <Chart />
      </div>
    </div>
  );
};

export default CitiesPage;
