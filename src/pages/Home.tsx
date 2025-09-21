import ImageSlider from "../components/ImageSlider";
import ServicesCarousel from "../components/ServiceCarousel";

function Home() {
  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageSlider />
      </div>
      <ServicesCarousel />
    </>
  );
}

export default Home;
