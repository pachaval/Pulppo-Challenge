"use client";

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import { searchBarAtom } from "../atoms/searchBarAtom";
import { listingsAtom } from "../atoms/listingsAtom";
import groupListings from "../utils/groupListings";
import CustomTooltip from "./CustomTooltip";
import { ChartData } from "../types";
import Spinner from "./Spinner";

const CityBarChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [{ loading }] = useAtom(searchBarAtom);
  const [listings] = useAtom(listingsAtom);

  useEffect(() => {
    const chartData = groupListings(listings);
    setData(chartData);
  }, [listings]);

  return (
    <div className="w-4/5 h-[400px]">
      <h4 className="mb-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">
        Propiedades{" "}
        <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
          ($/m²)
        </mark>
      </h4>
      {loading && <Spinner />}
      {!loading && listings.length === 0 && (
        <span>Busca una ciudad para ver los datos...</span>
      )}
      {!loading && listings.length > 0 && (
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
            <Bar dataKey="Casa" fill="#0088FE" barSize={30} />
            <Bar dataKey="Departamento" fill="#82ca9d" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CityBarChart;
