import React from "react";
import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" , display: "flex", justifyContent: "center"}}>
      <ImageSlider />
    </div>
  );
}

export default Home;
