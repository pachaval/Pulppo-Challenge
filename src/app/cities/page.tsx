import React from "react";
import SearchableDropdown from "../components/SearchDropdown";
import Chart from "../components/Chart";
import CityPieChart from "../components/CityPieChart";

const CitiesPage = async () => {
  let cities;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities`, {
      cache: "no-store",
    });

    cities = await res.json();
  } catch (error: any) {
    console.error(error.message);
  }

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
