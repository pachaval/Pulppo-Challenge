import React from "react";

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
    <div>
      <h1>House Listings</h1>
      <ul>
        {listings.map((listing: any, i: number) => (
          <li key={i}>{JSON.stringify(listing)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListingsPage;
