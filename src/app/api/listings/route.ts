import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest } from "next/server";

const listingSchema = new mongoose.Schema({}, { strict: false });
const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema, "mls");

// RETRIEVE ALL THE CITIES FOUND IN THE DB TO USE AS FILTERS
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const uniqueCities = await Listing.distinct("address.city.name", {
      "address.city.name": { $exists: true },
    });

    return new Response(JSON.stringify(uniqueCities), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
