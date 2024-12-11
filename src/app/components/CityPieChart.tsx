"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cityAtom } from "../atoms/cityAtom";
import { useAtom } from "jotai";
import { listingsAtom } from "../atoms/listingsAtom";

const COLORS: Record<string, string> = {
  Departamento: "#00C49F",
  Casa: "#0088FE",
};

const RADIAN = Math.PI / 180;

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`$${Math.round(value)}`}
    </text>
  );
};

const CityPieChart = () => {
  const [listings] = useAtom(listingsAtom);
  const [cityAvg] = useAtom(cityAtom);

  const data = Object.entries(cityAvg).map(([name, value]) => ({
    name,
    value,
  }));

  if (listings.length < 1) {
    return <span>Ingrese una ciudad para comenzar!</span>;
  }

  return (
    <div style={{ width: "60%", height: "400px" }}>
      <h4 className="text-2xl dark:text-black">Precio medio por m²</h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) =>
              renderCustomizedLabel({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
              })
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[entry.name] || "#cccccc"}
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
    </div>
  );
};

export default CityPieChart;
