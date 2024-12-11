import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

const citiesSchema = new mongoose.Schema({}, { strict: false });
const Cities =
  mongoose.models.Cities || mongoose.model("Cities", citiesSchema, "mls");

export async function GET() {
  try {
    await connectToDatabase();

    const uniqueCities = await Cities.distinct("address.city.name", {
      "address.city.name": { $exists: true },
      type: { $in: ["Casa", "Departamento"] },
      "attributes.roofedSurface": { $gt: 0 },
    });

    return new Response(JSON.stringify(uniqueCities), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
