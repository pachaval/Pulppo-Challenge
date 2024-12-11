import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import removeUnusualData from "@/app/utils/dataCleaner";
import calculateAveragePricePerMeterByType from "@/app/utils/averageCalculator";

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

    const cleanedData = removeUnusualData(listings);
    const avgPerType = calculateAveragePricePerMeterByType(listings);

    const data = {
      listings: cleanedData,
      avgPerType,
    };

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
