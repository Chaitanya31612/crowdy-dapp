import React from "react";
import {
  AboutSection,
  FeatureSection,
  HelpSection,
  HeroSection,
  ProblemsSection,
  SolutionSection,
} from "../components/Homepage";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProblemsSection />
      <SolutionSection />
      <FeatureSection />
      <HelpSection />
    </>
  );
};

export default Homepage;
