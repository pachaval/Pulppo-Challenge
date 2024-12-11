import mongoose from "mongoose";
import { NextRequest } from "next/server";

import calculateAveragePricePerMeterByType from "@/app/utils/averageCalculator";
import removeUnusualData from "@/app/utils/dataCleaner";
import { connectToDatabase } from "@/lib/mongodb";

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

    // Aqui obtengo unicamente los datos que necesito para utilizar en la app y optimizar la query
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
    const avgPerType = calculateAveragePricePerMeterByType(cleanedData);

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
