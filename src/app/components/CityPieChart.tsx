"use client";

import React from "react";
import { useAtom } from "jotai";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { searchBarAtom } from "../atoms/searchBarAtom";
import { listingsAtom } from "../atoms/listingsAtom";
import CustomizedLabel from "./CustomizedLabel";
import { cityAtom } from "../atoms/cityAtom";
import Spinner from "./Spinner";
import { COLORS } from "../types";

const CityPieChart = () => {
  const [{ loading }] = useAtom(searchBarAtom);
  const [listings] = useAtom(listingsAtom);
  const [cityAvg] = useAtom(cityAtom);

  const cityData = Object.entries(cityAvg).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-3/5 h-[400px]">
      <h4 className="mb-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">
        Precio medio por{" "}
        <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
          m²
        </mark>
      </h4>
      {loading && <Spinner />}
      {!loading && listings.length === 0 && (
        <span>Busca una ciudad para ver los datos...</span>
      )}
      {!loading && listings.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={cityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) =>
                CustomizedLabel({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                })
              }
              outerRadius={150}
              dataKey="value"
              fill="#8884d8"
            >
              {cityData.map((entry) => (
                <Cell
                  fill={COLORS[entry.name] || "#cccccc"}
                  key={`cell-${entry.name}`}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `$${Math.round(value)}`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CityPieChart;
