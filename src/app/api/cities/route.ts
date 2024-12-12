import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

const citiesSchema = new mongoose.Schema({}, { strict: false });
const Cities =
  mongoose.models.Cities || mongoose.model("Cities", citiesSchema, "mls");

export async function GET() {
  try {
    await connectToDatabase();

    // A modo de tener datos congruentes y optimizar la query obtengo
    // los nombres de ciudades que tengan mas de 30 campos con
    // casas y departamentos cuyos metros sean mayor a 0. Esta data
    // va a servir como base del filtro que usa la app. Se buscará una
    // vez estaticamente y se cacheara para optimizar performance.
    const uniqueCities = await Cities.aggregate([
      {
        $match: {
          "address.city.name": { $exists: true },
          type: { $in: ["Casa", "Departamento"] },
          "attributes.roofedSurface": { $gt: 0 },
        },
      },
      {
        $group: {
          _id: "$address.city.name",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 30 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
        },
      },
    ]);

    const cityNames = uniqueCities.map((entry) => entry.city);

    return new Response(JSON.stringify(cityNames), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
