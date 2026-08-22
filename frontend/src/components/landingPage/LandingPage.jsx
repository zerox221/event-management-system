import React from "react";
import HeroSection from "./HeroSection";
import LandingPageInfo from "./LandingPageInfo";
import Footer from "./Footer";
const LandingPage = () => {
  return (
    <div className=" p-5 md:p-10 gap-15 flex flex-col">
      <HeroSection />
      <LandingPageInfo />
      <Footer/>
    </div>
  );
};

export default LandingPage;
