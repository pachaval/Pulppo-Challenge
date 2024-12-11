import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest } from "next/server";

const listingsSchema = new mongoose.Schema({}, { strict: false });
const Listings =
  mongoose.models.Listings || mongoose.model("Listings", listingsSchema, "mls");

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const city = url.searchParams.get("city");

    if (!city) {
      return new Response(
        JSON.stringify({ error: "City parameter is required" }),
        { status: 400 }
      );
    }

    const listings = await Listings.aggregate([
      {
        $match: {
          "address.city.name": city,
          type: { $in: ["Casa", "Departamento"] },
          "attributes.roofedSurface": { $gt: 0 },
        },
      },
      {
        $project: {
          price: "$listing.price.price",
          type: 1,
          roofedSurface: "$attributes.roofedSurface",
        },
      },
    ]);

    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
