import React from "react";
import SearchableDropdown from "../components/SearchDropdown";

const ListingsPage = async () => {
  let listings;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`, {
      cache: "no-store",
    });

    listings = await res.json();
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <div className="flex items-center">
      <ul>
        <SearchableDropdown options={listings} />
      </ul>
    </div>
  );
};

export default ListingsPage;
