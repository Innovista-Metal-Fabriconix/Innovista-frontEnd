import CustomerFeedback from "../components/CustomerFeedback";
import FeaturedProducts from "../components/FeaturedProducts";
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
      <FeaturedProducts />
      <CustomerFeedback/>
      
    </>
  );
}

export default Home;
