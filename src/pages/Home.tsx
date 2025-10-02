import ImageSlider from "../components/ImageSlider";
import ServicesCarousel from "../components/ServiceCarousel";

function Home() {
  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          marginBottom: "50px",
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
