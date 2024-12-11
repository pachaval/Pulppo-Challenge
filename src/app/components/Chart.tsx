"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataItem = {
  type: string;
  cost: number[];
};

const data: DataItem[] = [
  {
    type: "Casa",
    cost: [2400, 1212, 1212],
  },
  {
    type: "Departamento",
    cost: [1398],
  },
  {
    type: "Lote",
    cost: [9800],
  },
];

const transformedData = data.map((item) => {
  const costsObject = item.cost.reduce((acc: any, cost, index) => {
    acc[`cost${index + 1}`] = cost;
    return acc;
  }, {});
  return {
    type: item.type,
    ...costsObject,
  };
});

const typeColors: Record<string, string> = {
  Casa: "#8884d8",
  Departamento: "#82ca9d",
  Lote: "#ffc658",
};

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const costs = payload.map((entry: any) => entry.value);
    const sum = costs.reduce((total: number, cost: number) => total + cost, 0);
    const media = sum / costs.length;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>Media</p>
        <span>{`$${media.toFixed(2)}`}</span>{" "}
      </div>
    );
  }

  return null;
};

const Chart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={transformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {Array.from({
            length: Math.max(...data.map((item) => item.cost.length)),
          }).map((_, costIndex) => (
            <Bar
              key={`cost${costIndex + 1}`}
              dataKey={`cost${costIndex + 1}`}
              fill={typeColors[data[costIndex]?.type]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;