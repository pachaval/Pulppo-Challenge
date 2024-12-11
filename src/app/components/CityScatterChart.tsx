"use client";

import { useAtomValue } from "jotai";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { listingsAtom } from "../atoms/listingsAtom";

const Example: React.FC = () => {
  const listings = useAtomValue(listingsAtom);
  console.log("atom", listings);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="price" name="Price" unit="$" />
        <YAxis
          type="number"
          dataKey="roofedSurface"
          name="Roofed Surface"
          unit="m²"
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name, props) =>
            `${value} ${name === "Roofed Surface" ? "m²" : "$"}`
          }
          labelFormatter={(label) => `Details`}
        />
        <Scatter
          name="Casa"
          data={listings?.filter((item) => item.type === "Casa")}
          fill="#8884d8"
        />
        <Scatter
          name="Departamento"
          data={listings?.filter((item) => item.type === "Departamento")}
          fill="#82ca9d"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Example;
