import React from "react";
import SearchableDropdown from "../components/SearchDropdown";
import Chart from "../components/Chart";
import CityScatterChart from "../components/CityScatterChart";

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
      <div className="flex">
        <CityScatterChart />
        <Chart />
      </div>
    </div>
  );
};

export default CitiesPage;
