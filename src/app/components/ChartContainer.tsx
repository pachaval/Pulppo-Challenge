import CityBarChart from "./CityBarChart";
import CityPieChart from "./CityPieChart";

const ChartContainer = () => {
  return (
    <div className="flex h-full">
      <CityPieChart />
      <CityBarChart />
    </div>
  );
};

export default ChartContainer;
