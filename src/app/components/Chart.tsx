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

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const { Casa, Departamento, roofedSurface } = data;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>
          {Casa !== undefined ? "Casa" : "Departamento"} de {roofedSurface}m²
        </p>
        {Casa !== undefined && (
          <>
            <p style={{ margin: 0 }}>Total: ${Casa}</p>
            <p style={{ margin: 0 }}>
              Precio por m2: ${(Casa / roofedSurface).toFixed(2)}
            </p>
          </>
        )}
        {Departamento !== undefined && (
          <>
            <p style={{ margin: 0 }}>Total: ${Departamento}</p>
            <p style={{ margin: 0 }}>
              Precio por m2: ${(Departamento / roofedSurface).toFixed(2)}
            </p>
          </>
        )}
      </div>
    );
  }
  return null;
};

const Chart: React.FC = () => {
  const [listings] = useAtom(listingsAtom);

  const [data, setData] = useState<
    { roofedSurface: number; Casa?: number; Departamento?: number }[]
  >([]);

  useEffect(() => {
    const grouped: Record<
      number,
      { casaPrices: number[]; deptPrices: number[] }
    > = {};

    listings.forEach((item) => {
      const { roofedSurface, price, type } = item;
      if (!grouped[roofedSurface]) {
        grouped[roofedSurface] = { casaPrices: [], deptPrices: [] };
      }
      if (type === "Casa") {
        grouped[roofedSurface].casaPrices.push(price);
      } else if (type === "Departamento") {
        grouped[roofedSurface].deptPrices.push(price);
      }
    });

    const chartData = Object.entries(grouped)
      .map(([surfaceStr, { casaPrices, deptPrices }]) => {
        const roofedSurface = Number(surfaceStr);
        const casaAvg =
          casaPrices.length > 0
            ? casaPrices.reduce((sum, val) => sum + val, 0) / casaPrices.length
            : undefined;
        const deptAvg =
          deptPrices.length > 0
            ? deptPrices.reduce((sum, val) => sum + val, 0) / deptPrices.length
            : undefined;

        return {
          roofedSurface,
          Casa: casaAvg,
          Departamento: deptAvg,
        };
      })
      .sort((a, b) => a.roofedSurface - b.roofedSurface);

    setData(chartData);
  }, [listings]);

  return (
    <div style={{ width: "80%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="roofedSurface"
            tickFormatter={(value) => value + "m²"}
          />
          <YAxis
            type="number"
            tickFormatter={(value) =>
              "$" + (value / 1000).toLocaleString("de-DE") + "k"
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Casa" fill="#8884d8" barSize={30} />
          <Bar dataKey="Departamento" fill="#82ca9d" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
