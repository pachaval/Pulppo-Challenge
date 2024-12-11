"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Listing, listingsAtom } from "../atoms/listingsAtom";
import { useAtom } from "jotai";

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const price = data.price;
    const surface = data.roofedSurface;
    const avg = surface ? price / surface : 0;

    return (
      <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "10px" }}>
        <p style={{ margin: 0 }}>Price: ${price}</p>
        <p style={{ margin: 0 }}>m2: {surface}</p>
        <p style={{ margin: 0 }}>avg: {avg.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const Chart: React.FC = () => {
  const [listings] = useAtom(listingsAtom);
  const [filteredData, setFilteredData] = useState<Listing[]>([]);

  useEffect(() => {
    const casas = listings.filter((item) => item.type === "Departamento");
    setFilteredData(casas);
  }, [listings]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="roofedSurface" />
          <YAxis type="number" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
