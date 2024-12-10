import React from "react";
import SearchableDropdown from "../components/SearchDropdown";

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
      <ul>
        <SearchableDropdown options={cities} />
      </ul>
    </div>
  );
};

export default CitiesPage;
