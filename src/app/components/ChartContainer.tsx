"use client";

import CityBarChart from "./CityBarChart";
import CityPieChart from "./CityPieChart";

const ChartContainer = ({ cities }: any) => {
  if (!cities.length) {
    return <span>...loading</span>;
  }
  return (
    <div className="flex h-full">
      <CityPieChart />
      <CityBarChart />
    </div>
  );
};

export default ChartContainer;
