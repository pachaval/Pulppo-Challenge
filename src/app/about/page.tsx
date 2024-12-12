import React from "react";
import TechDecisions from "../components/About/TechDecisions";
import Conclusions from "../components/About/Conclusions";
import HowItWorks from "../components/About/HowItWorks";
import YouGet from "../components/About/YouGet";
import Intro from "../components/About/Intro";

const PulppoStats = () => (
  <div className="flex p-10 pt-0">
    <div className="w-1/2">
      <Intro />
      <HowItWorks />
      <YouGet />
      <TechDecisions />
    </div>
    <div className="w-1/2">
      <Conclusions />
    </div>
  </div>
);

export default PulppoStats;
