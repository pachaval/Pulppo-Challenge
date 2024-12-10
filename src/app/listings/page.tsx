async function fetchListings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }
  return res.json();
}

export default async function ListingsPage() {
  let listings = [];
  try {
    listings = await fetchListings();
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
}
