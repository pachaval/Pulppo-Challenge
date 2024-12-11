import { fetchCities } from "../lib/cities";

const PulppoStats = async () => {
  const cities = await fetchCities();
  return <div></div>;
};

export default PulppoStats;
