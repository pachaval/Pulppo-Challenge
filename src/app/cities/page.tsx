import React from "react";
import SearchableDropdown from "../components/SearchDropdown";
import Chart from "../components/Chart";

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
    <div className="flex items-center">
      <SearchableDropdown options={cities} />
      <Chart />
    </div>
  );
};

export default CitiesPage;
